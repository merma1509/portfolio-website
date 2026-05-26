from fastapi import APIRouter, HTTPException
from models import Blog
from database import get_db
from datetime import datetime

router = APIRouter()

@router.get("/blogs")
async def get_blogs():
    try:
        conn = get_db()
        with conn.cursor() as cur:
            cur.execute('SELECT * FROM blogs ORDER BY created_at DESC')
            blogs = cur.fetchall()
        conn.close()
        return blogs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/blogs")
async def create_blog(blog: Blog):
    print(f"Creating blog with data: {blog}")
    conn = None
    try:
        conn = get_db()
        with conn.cursor() as cur:
            # First, check if the author exists
            print(f"Checking if author with ID {blog.author_id} exists")
            cur.execute('SELECT id FROM users WHERE id = %s', (blog.author_id,))
            author = cur.fetchone()
            print(f"Author check result: {author}")
            
            if not author:
                print("Author not found, raising 400 error")
                raise HTTPException(status_code=400, detail="Author does not exist")
            
            # If author exists, create the blog post
            print("Author exists, creating blog post")
            try:
                cur.execute('''
                    INSERT INTO blogs (title, content, author_id, created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id
                ''', (blog.title, blog.content, blog.author_id, datetime.now(), datetime.now()))
                
                result = cur.fetchone()
                if not result:
                    raise HTTPException(status_code=500, detail="Failed to create blog")
                    
                blog_id = result['id']
                conn.commit()
                print(f"Blog created successfully with ID: {blog_id}")
                return {"message": "Blog created successfully", "id": blog_id}
                
            except Exception as e:
                conn.rollback()
                print(f"Database error: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
                
    except HTTPException as he:
        print(f"HTTPException: {he}")
        raise
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")
    finally:
        if conn is not None:
            try:
                conn.close()
            except Exception as e:
                print(f"Error closing connection: {str(e)}")

@router.put("/blogs/{blog_id}")
async def update_blog(blog_id: int, blog: Blog):
    try:
        conn = get_db()
        with conn.cursor() as cur:
            cur.execute('''
                UPDATE blogs SET title = %s, content = %s, updated_at = %s WHERE id = %s
            ''', (blog.title, blog.content, datetime.now(), blog_id))
        conn.commit()
        conn.close()
        return {"message": "Blog updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/blogs/{blog_id}")
async def delete_blog(blog_id: int):
    try:
        conn = get_db()
        with conn.cursor() as cur:
            cur.execute('DELETE FROM blogs WHERE id = %s', (blog_id,))
        conn.commit()
        conn.close()
        return {"message": "Blog deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
