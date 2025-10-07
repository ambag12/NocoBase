# Use Node.js LTS base image
FROM node:18-slim

# Create app directory
WORKDIR /app

# Copy all files to container
COPY . .

# Install dependencies
RUN yarn install --frozen-lockfile

# Expose port (usually 13000 for NocoBase)
EXPOSE 13001

# Start the app
CMD ["yarn", "start"]
