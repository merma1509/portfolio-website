import os
import asyncpg
from typing import AsyncGenerator, Optional, Dict, Any
from contextlib import asynccontextmanager
from fastapi import HTTPException

# Database URL from environment variable or default
DATABASE_URL = os.getenv("DATABASE_URL")

# Check if database is configured
DB_CONFIGURED = bool(DATABASE_URL)

# Database connection pool
_pool: Optional[asyncpg.Pool] = None

async def get_db() -> AsyncGenerator[asyncpg.Connection, None]:
    """
    Get a database connection from the pool.
    
    Yields:
        asyncpg.Connection: A database connection from the pool
    """
    if not DB_CONFIGURED:
        raise HTTPException(status_code=503, detail="Database not configured")
    
    global _pool
    if _pool is None:
        _pool = await asyncpg.create_pool(
            dsn=DATABASE_URL,
            min_size=1,
            max_size=10,
            command_timeout=60,
            server_settings={
                'application_name': 'portfolio_backend',
                'search_path': 'public'
            }
        )
    
    conn = await _pool.acquire()
    try:
        # Set up row factory to return dictionaries
        def dict_factory(record):
            return {k: v for k, v in record.items()}
        
        # Set row factory
        conn._con._row_factory = dict_factory
        
        yield conn
    finally:
        await _pool.release(conn)

async def init_db():
    """Initialize the database and create tables if they don't exist."""
    if not DB_CONFIGURED:
        print("Database not configured - skipping database initialization")
        return
        
    # Create a direct connection for initialization
    conn = await asyncpg.connect(DATABASE_URL)
    
    try:
        # Create tables if they don't exist
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                phone TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS newsletter_subscribers (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS project_inquiries (
                id SERIAL PRIMARY KEY,
                project_name TEXT NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                inquiry TEXT NOT NULL,
                phone TEXT,
                occupation TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create indexes for better query performance
        await conn.execute('''
            CREATE INDEX IF NOT EXISTS idx_project_inquiries_email 
            ON project_inquiries (email)
        ''')
        
        await conn.execute('''
            CREATE INDEX IF NOT EXISTS idx_contact_messages_email 
            ON contact_messages (email)
        ''')
        
        await conn.execute('''
            CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email 
            ON newsletter_subscribers (email)
        ''')
        
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS feedback (
                id SERIAL PRIMARY KEY,
                type TEXT NOT NULL,
                content TEXT NOT NULL,
                rating INTEGER CHECK (rating >= 1 AND rating <= 5),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS blogs (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                author_id INTEGER REFERENCES users(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        print("Database tables created/verified successfully")
        
    except Exception as e:
        print(f"Error initializing database: {e}")
        raise
    finally:
        await conn.close()

# Initialize the database when this module is imported (only if configured)
if DB_CONFIGURED:
    import asyncio
    asyncio.get_event_loop().run_until_complete(init_db())
