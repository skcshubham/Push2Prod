FROM node:20-bookworm-slim AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
# Serve built app
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# SPA + API proxy to backend service for Docker-only mode
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
