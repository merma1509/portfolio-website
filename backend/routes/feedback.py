from fastapi import APIRouter, HTTPException
from models import Feedback
from database import get_db
from datetime import datetime, timezone

router = APIRouter()

@router.post("/feedback")
async def submit_feedback(feedback: Feedback):
    try:
        conn = get_db()
        with conn.cursor() as cur:
            cur.execute('''
                INSERT INTO feedback (type, content, rating, created_at)
                VALUES (%s, %s, %s, %s)
            ''', (feedback.type, feedback.content, feedback.rating, datetime.now(timezone.utc)))
        conn.commit()
        conn.close()
        return {"message": "Feedback sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
