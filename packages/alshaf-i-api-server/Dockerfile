FROM node:current-alpine3.15

WORKDIR /usr/src/app

COPY build .

EXPOSE 80

ENV DEBUG_MODE=production

CMD ["node", "index.js"]
