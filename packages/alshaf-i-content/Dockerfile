FROM nginx:stable-alpine-perl

WORKDIR /www/data/

COPY nginx.conf /etc/nginx
ADD ./static ./

EXPOSE 80
