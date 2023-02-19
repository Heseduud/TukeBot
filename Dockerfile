# syntax = docker/dockerfile:1.2
FROM node:16-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env node deploy-commands.js
CMD ["npm", "start"]