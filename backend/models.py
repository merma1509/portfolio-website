from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime

class ContactMessage(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=20)
    message: str = Field(..., min_length=10, max_length=2000)
    occupation: Optional[str] = Field(None, max_length=100)

class NewsletterSubscriber(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr

class ProjectInquiry(BaseModel):
    project_name: str = Field(..., min_length=2, max_length=100)
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    inquiry: str = Field(..., min_length=10, max_length=2000)
    phone: Optional[str] = Field(None, min_length=5, max_length=20)
    occupation: Optional[str] = Field(None, max_length=100)
    
    class Config:
        json_schema_extra = {
            "example": {
                "project_name": "My Project",
                "name": "John Doe",
                "email": "john@example.com",
                "inquiry": "I would like to discuss a potential project...",
                "phone": "+1234567890",
                "occupation": "Software Developer"
            }
        }

class Feedback(BaseModel):
    type: str
    content: str
    rating: int

class User(BaseModel):
    username: str
    email: str
    password: str

class Blog(BaseModel):
    title: str
    content: str
    author_id: int
