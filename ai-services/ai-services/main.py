import os
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Initialize the App
app = FastAPI(title="Habitual Trends API")

# --- Data Models (Schema) ---
class Habit(BaseModel):
    id: int
    name: str
    streak: int
    last_completed: Optional[str] = None

# --- Mock Database (In-Memory for now) ---
# In a real app, you would connect to Postgres/SQLite here
habits_db = [
    {"id": 1, "name": "Drink Water", "streak": 5, "last_completed": "2023-10-27"},
    {"id": 2, "name": "Read Rust Docs", "streak": 12, "last_completed": "2023-10-26"},
]

# --- Routes ---

@app.get("/")
def read_root():
    """Health check and welcome message."""
    return {"message": "Welcome to Habitual Trends API", "status": "active"}

@app.get("/habits", response_model=List[Habit])
def get_habits():
    """Get all current habits."""
    return habits_db

@app.post("/habits")
def create_habit(habit: Habit):
    """Add a new habit."""
    habits_db.append(habit.dict())
    return {"message": "Habit created", "data": habit}

@app.get("/health")
def health_check():
    """Fly.io health check endpoint."""
    return {"status": "ok"}

# --- Entry Point ---
if __name__ == "__main__":
    # Get the PORT from Fly.io env, or default to 8080
    port = int(os.environ.get("PORT", 8080))
    
    # Run the server
    # host="0.0.0.0" is MANDATORY for Fly.io/Docker
    uvicorn.run(app, host="0.0.0.0", port=port)