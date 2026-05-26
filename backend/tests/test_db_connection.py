#!/usr/bin/env python3
"""
Test script to verify Supabase database connection
"""
import os
import asyncio
import asyncpg

# Your Supabase connection string
DATABASE_URL = "postgresql://postgres.wftqjaayowzpcthppqhz:Mugabo150520%@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

async def test_connection():
    """Test database connection and basic operations"""
    try:
        print("Connecting to Supabase...")
        
        # Test connection
        conn = await asyncpg.connect(DATABASE_URL)
        
        print("Connected successfully!")
        
        # Test basic query
        result = await conn.fetchval("SELECT version()")
        print(f"PostgreSQL version: {result}")
        
        # Test table creation (should exist from our schema)
        tables = await conn.fetch("""
            SELECT table_name FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name
        """)
        
        print(f"Found {len(tables)} tables:")
        for table in tables:
            print(f"   - {table['table_name']}")
        
        # Test insert/read
        await conn.execute("""
            INSERT INTO contact_messages (name, email, message, phone) 
            VALUES ($1, $2, $3, $4)
            ON CONFLICT DO NOTHING
        """, "Test User", "test@example.com", "Test message", "+1234567890")
        
        count = await conn.fetchval("SELECT COUNT(*) FROM contact_messages")
        print(f"Contact messages in database: {count}")
        
        # Clean up test data
        await conn.execute("DELETE FROM contact_messages WHERE email = 'test@example.com'")
        
        await conn.close()
        print("All tests passed! Database is ready for production.")
        
    except Exception as e:
        print(f"Error: {e}")
        return False
    
    return True

if __name__ == "__main__":
    asyncio.run(test_connection())
