# 1. Use the official Rust image as the base
FROM rust:latest

# 2. Set the working directory inside the container
WORKDIR /usr/src/habitual-trends

# 3. Copy all your project files into the container
COPY . .

# 4. Install the application
# This builds the release version and puts it in the global bin folder
RUN cargo install --path .

# 5. The command to run when the container starts
CMD ["habitual-trends"]
