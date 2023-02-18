FROM node:16-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN node deploy-commands.js
CMD ["npm", "start"]