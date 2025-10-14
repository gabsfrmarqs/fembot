## build runner
FROM node:24.10

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Start bot
CMD [ "node", "main.js" ]
