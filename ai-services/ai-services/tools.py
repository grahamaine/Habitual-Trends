from pydantic import BaseModel, Field
from langchain_core.tools import tool
import datetime

# 1. Define Schemas
# These classes act as a "contract" so the AI knows exactly what info to ask for.
class GymBookingSchema(BaseModel):
    day: str = Field(description="The day of the week or specific date (e.g., 'Monday' or '2026-01-25')")
    time: str = Field(description="The preferred time for the session (e.g., '07:00 AM')")

class CalendarCheckSchema(BaseModel):
    query: str = Field(description="The user's question about their schedule (e.g., 'What is my morning looking like?')")

# 2. Define Tool Functions
# The docstrings ("""...""") are vital! The AI reads them to decide WHICH tool to use.

@tool(args_schema=GymBookingSchema)
def schedule_gym_session(day: str, time: str) -> str:
    """Use this tool when the user wants to book, log, or schedule a gym session or workout."""
    # This is where you would normally add code to save to a database.
    # For now, we return a success message for the AI to read back to the user.
    return f"Done! I've added a gym session to your Habitual Trends log for {day} at {time}."

@tool(args_schema=CalendarCheckSchema)
def check_calendar_availability(query: str) -> str:
    """Use this tool to check for conflicts or see what is already on the user's schedule."""
    # In a production app, you would integrate the Google Calendar API here.
    # Mocking a response for local testing:
    return f"I checked your calendar regarding '{query}'. It looks like you have a 30-minute gap at 8:00 AM!"