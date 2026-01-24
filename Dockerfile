# --- Stage 1: Build the Rust Backend ---
FROM rust:1.75-slim as rust-builder
WORKDIR /app
COPY ./rust-backend ./rust-backend
COPY Cargo.lock ./
# Pre-fetch dependencies to speed up future builds
RUN cd rust-backend && cargo build --release

# --- Stage 2: Final Runtime Image ---
FROM python:3.11-slim

# Install system dependencies (needed for many Python/Rust libs)
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the Rust binary from Stage 1
COPY --from=rust-builder /app/rust-backend/target/release/habitual-trends-backend /usr/local/bin/rust-backend

# Copy Python requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose ports (Streamlit uses 8501, Reflex 8000, Rust custom)
EXPOSE 8501 8000 8080

# Use a startup script to run both services
CMD ["sh", "-c", "rust-backend & streamlit run habitual_trends/main.py --server.port 8501 --server.address 0.0.0.0"]
