### STAGE 1: BUILD ###
FROM node:18.15.0-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

### STAGE 2: RUN ###
FROM nginx:1.23.4-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/shop /usr/share/nginx/html