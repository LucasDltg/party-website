# Use official Node.js 18 LTS image as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies (using npm ci for clean install)
RUN npm ci --only=production

# Copy the rest of your app's source code
COPY . .

# Build your project (assuming your build script outputs to 'dist' or similar)
RUN npm run build

# Expose the port your app listens on (adjust if needed)
EXPOSE 3000

# Start the app (adjust this command to your start script)
CMD ["npm", "start"]
