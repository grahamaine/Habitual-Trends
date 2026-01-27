# Stage 1: Base image with Python and Node.js
FROM python:3.11-slim-bookworm

# Set environment variables to prevent Python from buffering output
# and to avoid writing .pyc files
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Install system dependencies
# Node.js and npm are required for Reflex to build the frontend
# curl/unzip are often needed for downloading assets
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    curl \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the python requirements first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Initialize Reflex (creates necessary config if missing) and build the frontend
# We use --frontend-only export to prepare the static assets
RUN reflex init
RUN reflex export --frontend-only --no-zip

# Expose the port that Fly.io (or your host) expects
# Reflex defaults: Backend 8000, Frontend 3000. 
# We expose 8080 as a common standard for container runners.
ENV PORT=8080
EXPOSE 8080

# Command to run the application in production mode
# This runs the backend and serves the frontend assets
CMD ["reflex", "run", "--env", "prod", "--backend-host", "0.0.0.0", "--backend-port", "8080"]