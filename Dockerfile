# --- Stage 1: Build the Rust Backend ---
FROM rust:1.75-slim as rust-builder
WORKDIR /app
COPY . .
# Build the Rust release binary
RUN cargo build --release

# --- Stage 2: Final Runtime Environment ---
FROM python:3.12-slim
WORKDIR /app

# Install system dependencies (including PostgreSQL client)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install 'uv' for fast Python dependency management
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Copy Python dependency files
COPY pyproject.toml ./ 
# If you have a uv.lock or requirements.txt, uncomment the next line:
# COPY uv.lock ./ 

# Install Python dependencies using uv
RUN uv sync --frozen --no-cache

# Copy the compiled Rust binary from Stage 1
COPY --from=rust-builder /app/target/release/habitual-trends-backend ./backend-engine

# Copy the rest of your application code
COPY . .

# Expose the port (Fly.io defaults to 8080)
EXPOSE 8080

# Set environment variables for Gemini and Opik
ENV PYTHONUNBUFFERED=1

# Start the application 
# (Swap "streamlit run app.py" for your Reflex/Python entry point)
CMD ["uv", "run", "streamlit", "run", "app.py", "--server.port", "8080"]
