# syntax = docker/dockerfile:1.2
FROM node:16-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
# Uploads commands to REST during deploy workflow
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env node -r dotenv/config deploy-commands.js dotenv_config_path=/etc/secrets/.env 
CMD ["npm", "start"]