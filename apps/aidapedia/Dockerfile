# Aidapedia's site on a domain of its own, served by nginx. Build from the repo root
# (apps/aidapedia/docker-compose.yml does), since it needs packages/shared.
FROM node:22-bookworm-slim AS build

WORKDIR /app

# Every workspace's package.json, or npm ci finds the lockfile out of step. Dev deps run the Vite build.
COPY package*.json ./
COPY apps/aidapedia/package.json apps/aidapedia/
COPY apps/tabletsgo/package.json apps/tabletsgo/
COPY packages/shared/package.json packages/shared/
RUN npm ci

# Where people reach this site and Tabletsgo's, baked into the build (see packages/shared/vite.js).
ARG AIDAPEDIA_URL=/
ARG TABLETSGO_URL
ENV AIDAPEDIA_URL=${AIDAPEDIA_URL} TABLETSGO_URL=${TABLETSGO_URL}

COPY . .
RUN npm run build -w apps/aidapedia

FROM nginx:alpine

COPY nginx.app.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
