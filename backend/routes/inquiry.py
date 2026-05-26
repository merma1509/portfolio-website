from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from models import ProjectInquiry
from database import get_db
from datetime import datetime, timezone
from typing import Dict, Any, Optional, List
import logging
import traceback
from typing_extensions import Annotated

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# Dependency to get database connection
async def get_db_connection():
    """Get a database connection with error handling."""
    try:
        async for conn in get_db():
            yield conn
    except Exception as e:
        logger.error(f"Database connection error: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Unable to connect to the database"
        )

@router.post(
    "/inquiry",
    status_code=status.HTTP_201_CREATED,
    response_model=Dict[str, Any],
    responses={
        201: {"description": "Inquiry submitted successfully"},
        400: {"description": "Bad Request - Invalid input data"},
        422: {"description": "Validation Error"},
        500: {"description": "Internal server error"}
    }
)
async def submit_inquiry(
    inquiry: ProjectInquiry,
    conn: Annotated[Any, Depends(get_db_connection)]
) -> Dict[str, Any]:
    """
    Submit a new project inquiry.
    
    - **project_name**: Name of the project (required, max 100 chars)
    - **name**: Your name (required, max 100 chars)
    - **email**: Your email address (required, must be valid email format)
    - **inquiry**: Details about your project (required, min 10 chars)
    - **phone**: Your phone number (optional, max 20 chars)
    - **occupation**: Your occupation/role (optional, max 100 chars)
    """
    try:
        logger.info(f"Received inquiry from {inquiry.email} for project: {inquiry.project_name}")
        
        # Prepare data for insertion, excluding unset fields
        data = inquiry.model_dump(exclude_unset=True)
        
        # Log the incoming data (excluding sensitive info in production)
        log_data = data.copy()
        if 'email' in log_data:
            log_data['email'] = f"{log_data['email'].split('@')[0]}@..."
        logger.debug(f"Processing inquiry data: {log_data}")
        
        # Build the query
        columns = list(data.keys())
        values = [data[col] for col in columns]
        
        # Generate placeholders ($1, $2, etc.)
        placeholders = [f'${i+1}' for i in range(len(columns))]
        
        query = f"""
            INSERT INTO project_inquiries ({', '.join(columns)})
            VALUES ({', '.join(placeholders)})
            RETURNING id, created_at
        """
        
        try:
            # Execute the query
            result = await conn.fetchrow(query, *values)
            
            if not result:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to save inquiry. Please try again."
                )
            
            inquiry_id = result['id']
            created_at = result['created_at']
            
            logger.info(f"Inquiry {inquiry_id} saved successfully at {created_at}")
            
            return {
                "message": "Thank you for your inquiry! We'll get back to you soon.",
                "inquiry_id": inquiry_id,
                "received_at": created_at.isoformat() if created_at else None
            }
            
        except Exception as e:
            logger.error(f"Database error: {str(e)}")
            logger.error(traceback.format_exc())
            
            # Handle unique constraint violations
            if 'duplicate key value violates unique constraint' in str(e):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="An inquiry with this information already exists."
                )
                
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An error occurred while saving your inquiry. Please try again later."
            )
            
    except HTTPException as http_exc:
        # Re-raise HTTP exceptions with proper status code
        logger.warning(f"Request validation failed: {str(http_exc.detail)}")
        raise http_exc
        
    except Exception as e:
        logger.error(f"Unexpected error in submit_inquiry: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred. Our team has been notified."
        )
