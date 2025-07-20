# Use Node base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package manifests
COPY package*.json ./

# Set production environment and disable husky
ENV NODE_ENV=production
ENV HUSKY=0

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the rest of the code
COPY . .

RUN ls -l /app

# Build the Next.js app
RUN npm run build

# Expose port and set default command
EXPOSE 3000
CMD ["npm", "start"]
