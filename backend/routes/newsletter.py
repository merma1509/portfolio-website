from fastapi import APIRouter, HTTPException
from models import NewsletterSubscriber
from database import get_db
from datetime import datetime

router = APIRouter()

@router.post("/newsletter")
async def subscribe_newsletter(subscriber: NewsletterSubscriber):
    try:
        conn = get_db()
        with conn.cursor() as cur:
            cur.execute('''
                INSERT INTO newsletter_subscribers (name, email, subscribed_at)
                VALUES (%s, %s, %s)
            ''', (subscriber.name, subscriber.email, datetime.now()))
        conn.commit()
        conn.close()
        return {"message": "Subscribed to newsletter successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
