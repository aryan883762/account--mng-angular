# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY ./dist/account /usr/share/nginx/html

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]