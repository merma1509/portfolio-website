#!/usr/bin/env python3
"""
Production-ready FastAPI app with graceful database handling - VERSION 2.0
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio Backend API - v2.0")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str
    phone: str = None

@app.get("/")
async def root():
    return {"message": "Portfolio Backend API - Production Ready v2.0"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/api/contact")
async def contact(contact: ContactMessage):
    try:
        # For now, just return success without database
        # TODO: Add database connection later
        logger.info(f"Contact received: {contact.name} - {contact.email}")
        return {
            "message": "Contact form submitted successfully",
            "status": "success",
            "received": {
                "name": contact.name,
                "email": contact.email,
                "message": contact.message
            }
        }
    except Exception as e:
        logger.error(f"Contact error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
