FROM node:current-alpine3.15

WORKDIR /usr/src/app

ADD node_modules/ ./node_modules
COPY package.json .env ./
COPY dist .

EXPOSE 80

ENV DEBUG_MODE=production

CMD ["node", "index.js"]
