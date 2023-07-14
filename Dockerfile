### STAGE 1: BUILD ###
FROM node:18.15.0-alpine AS build
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm cache clean --force
RUN npm install
COPY . /app
RUN npm run build --prod

### STAGE 2: RUN ###
FROM nginx:1.23.4-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/shop /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]