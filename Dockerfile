FROM node:24.10

WORKDIR /app

# Copy package files and install dependencies
COPY . .

# Start using npm script
CMD ["npm", "run", "start"]