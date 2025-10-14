## build runner
FROM node:24.10 as build-runner

WORKDIR /app

COPY . .

# Start bot
CMD [ "node", "main.js" ]
