FROM node:24.10
WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY build/ .

CMD ["node", "main.js"]