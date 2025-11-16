FROM node:20-bookworm-slim AS base
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
EXPOSE 8000
CMD ["npm", "start"]

