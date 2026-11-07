# Builds every app in apps/ into one static site, then serves it with nginx.
FROM node:22-bookworm-slim AS build

WORKDIR /app

# Dev deps are needed to run the Vite build.
COPY package*.json ./
COPY apps/aidapedia/package.json apps/aidapedia/
COPY apps/tabletsgo/package.json apps/tabletsgo/
COPY packages/shared/package.json packages/shared/
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
