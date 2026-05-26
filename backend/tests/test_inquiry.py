import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock
from .. import database

mock_conn = MagicMock()
mock_cursor = MagicMock()
mock_conn.cursor.return_value.__enter__.return_value = mock_cursor
mock_conn.cursor.return_value.__exit__.return_value = None
mock_cursor.execute.return_value = None
mock_conn.commit.return_value = None
mock_conn.close.return_value = None

# Patch the get_db function
original_get_db = database.get_db
database.get_db = lambda: mock_conn

from ..main import app

client = TestClient(app)

@pytest.mark.asyncio
async def test_submit_inquiry():
    try:
        response = client.post("/api/inquiry", json={"project_name": "Test Project", "name": "Test", "email": "test@example.com", "inquiry": "Test inquiry", "phone": "123456789", "occupation": "investor"})
        assert response.status_code == 200
        assert response.json() == {"message": "Inquiry sent successfully"}
    finally:
        database.get_db = original_get_db
