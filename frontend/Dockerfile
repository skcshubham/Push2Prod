FROM node:20-bookworm-slim AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY --from=build /usr/src/app/dist/* /var/www/html/
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

