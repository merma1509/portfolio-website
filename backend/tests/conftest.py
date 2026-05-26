import os
import sys
import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch
from fastapi import FastAPI

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the app after setting up the path
from main import app
from database import get_db

# Create a test database URL
test_db_url = "sqlite:///./test.db"

@pytest.fixture(scope="function")
def test_app():
    # Create a fresh FastAPI app for testing
    test_app = FastAPI()
    
    # Import and include all routers from the original app
    from routes import blog, contact, feedback, inquiry, newsletter, user
    
    test_app.include_router(blog.router, prefix="/api", tags=["blog"])
    test_app.include_router(contact.router, prefix="/api", tags=["contact"])
    test_app.include_router(feedback.router, prefix="/api", tags=["feedback"])
    test_app.include_router(inquiry.router, prefix="/api", tags=["inquiry"])
    test_app.include_router(newsletter.router, prefix="/api", tags=["newsletter"])
    test_app.include_router(user.router, prefix="/api", tags=["user"])
    
    # Set up CORS for testing
    from fastapi.middleware.cors import CORSMiddleware
    test_app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000", "http://localhost:3001"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Set up test routes
    @test_app.get("/")
    async def root():
        return {"message": "Test API"}
        
    @test_app.get("/health")
    async def health():
        return {"status": "healthy"}
    
    # Create the test client
    with TestClient(test_app) as test_client:
        yield test_client

@pytest.fixture(scope="function")
def mock_db():
    with patch('database.psycopg2') as mock_pg:
        # Create mock connection and cursor
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        
        # Set up the cursor's context manager behavior
        mock_conn.cursor.return_value = mock_cursor
        mock_cursor.__enter__.return_value = mock_cursor
        mock_cursor.__exit__.return_value = None
        
        # Set up the connection's context manager behavior
        mock_pg.connect.return_value = mock_conn
        mock_conn.__enter__.return_value = mock_conn
        mock_conn.__exit__.return_value = None
        
        # Set default return values
        mock_cursor.fetchall.return_value = []
        mock_cursor.fetchone.return_value = None
        mock_cursor.execute.return_value = None
        mock_conn.commit.return_value = None
        mock_conn.close.return_value = None
        
        yield mock_conn, mock_cursor
