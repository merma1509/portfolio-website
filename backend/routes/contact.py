from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from database import get_db
from datetime import datetime, timezone
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class ContactMessage(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    message: str = Field(..., min_length=10, max_length=1000)
    occupation: Optional[str] = Field(None, max_length=100)

@router.post("/contact", response_model=dict)
async def submit_contact(message: ContactMessage):
    """
    Handle contact form submissions
    """
    conn = None
    try:
        logger.info(f"Received contact form submission: {message.dict()}")
        
        # Get database connection
        conn = get_db()
        
        with conn.cursor() as cur:
            # Insert the contact message
            cur.execute('''
                INSERT INTO contact_messages (name, email, message, phone, occupation, created_at)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id
            ''', (
                message.name,
                message.email,
                message.message,
                message.phone,
                message.occupation,
                datetime.now(timezone.utc)
            ))
            
            # Get the ID of the inserted record
            result = cur.fetchone()
            if not result:
                raise HTTPException(status_code=500, detail="Failed to save contact message")
                
            conn.commit()
            
            logger.info(f"Contact message saved with ID: {result['id']}")
            
            return {
                "status": "success",
                "message": "Your message has been sent successfully!",
                "message_id": result['id']
            }
            
    except HTTPException as he:
        logger.error(f"HTTP error in contact form submission: {str(he)}")
        raise
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your request. Please try again later."
        )
    finally:
        if conn is not None:
            try:
                conn.close()
            except Exception as e:
                logger.error(f"Error closing database connection: {str(e)}")
