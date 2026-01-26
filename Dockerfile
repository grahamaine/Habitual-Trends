FROM node:18-alpine

WORKDIR /app

# 1. Copy ONLY package.json (since you don't have a lock file yet)
COPY package.json ./

# 2. Install dependencies
RUN npm install

# 3. Copy the rest of the code
COPY . .

# 4. Start command
CMD ["node", "index.js"] 
# (Make sure 'index.js' is the correct start file. I see 'frontend.py' and 'App.tsx', so this might be a React or Python app?)
