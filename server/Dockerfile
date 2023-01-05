# Specify a base image
FROM node:16-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install 
COPY . .

# Default command
CMD ["npm", "start"]