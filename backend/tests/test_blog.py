import pytest
from unittest.mock import ANY, call

def test_get_blogs(test_app, mock_db):
    mock_conn, mock_cursor = mock_db
    
    # Set up mock return value for the query
    mock_cursor.fetchall.return_value = []
    
    # Make the request
    response = test_app.get("/api/blogs")
    
    # Assert the response
    assert response.status_code == 200
    assert response.json() == []
    
    # Verify the database was called correctly
    mock_cursor.execute.assert_called_once()
    # Check that the query contains the expected SQL
    args, _ = mock_cursor.execute.call_args
    assert 'SELECT * FROM blogs ORDER BY created_at DESC' in args[0]

def test_create_blog(test_app, mock_db):
    mock_conn, mock_cursor = mock_db
    
    # Test data
    blog_data = {"title": "Test Blog", "content": "Test content", "author_id": 1}
    
    # Set up the mock cursor's behavior
    # First call: user exists check
    mock_cursor.fetchone.return_value = {"id": 1}
    
    # Second call: blog creation
    mock_cursor.fetchone.side_effect = [
        {"id": 1},  # First call: user exists
        {"id": 1}   # Second call: blog created with ID 1
    ]
    
    # Make the request
    response = test_app.post("/api/blogs", json=blog_data)
    
    # Assert the response
    assert response.status_code == 200
    response_json = response.json()
    assert response_json["message"] == "Blog created successfully"
    assert "id" in response_json
    
    # Verify the database was called correctly
    # Check that execute was called at least twice (user check + blog insert)
    assert mock_cursor.execute.call_count >= 2
    
    # Check that commit was called
    mock_conn.commit.assert_called_once()
    
    # Check that the cursor was closed (via context manager)
    mock_cursor.__exit__.assert_called_once()
    
    # Verify the user check was done
    user_check_called = any(
        len(call_args[0]) > 0 and 
        isinstance(call_args[0][0], str) and 
        'SELECT id FROM users' in call_args[0][0]
        for call_args in mock_cursor.execute.call_args_list
    )
    
    blog_insert_called = any(
        len(call_args[0]) > 0 and 
        isinstance(call_args[0][0], str) and 
        'INSERT INTO blogs' in call_args[0][0]
        for call_args in mock_cursor.execute.call_args_list
    )
    
    assert user_check_called, "User check query was not called"
    assert blog_insert_called, "Blog insert query was not called"
