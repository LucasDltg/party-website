# Use Node base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package manifests
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Set production environment and disable husky
ENV NODE_ENV=production
ENV HUSKY=0

# Copy the rest of the code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port and set default command
EXPOSE 3000
CMD ["npm", "start"]
