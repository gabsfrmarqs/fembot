## build runner
FROM node:24.10 as build-runner

COPY . .

# Start bot
CMD [ "node", "main.js" ]
