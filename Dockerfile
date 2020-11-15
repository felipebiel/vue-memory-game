FROM node:12-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN npm install -g @vue/cli

RUN npm install