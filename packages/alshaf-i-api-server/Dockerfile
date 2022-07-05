FROM node:current-alpine3.15

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./dist .

EXPOSE 80

CMD ["node", "index.js"]
