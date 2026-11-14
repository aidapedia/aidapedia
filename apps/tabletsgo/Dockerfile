# Tabletsgo's product page and docs on a domain of their own, served by nginx. Build from
# the repo root (apps/tabletsgo/docker-compose.yml does), since it needs packages/shared.
FROM node:22-bookworm-slim AS build

WORKDIR /app

# Every workspace's package.json, or npm ci finds the lockfile out of step. Dev deps run the Vite build.
COPY package*.json ./
COPY apps/aidapedia/package.json apps/aidapedia/
COPY apps/tabletsgo/package.json apps/tabletsgo/
COPY packages/shared/package.json packages/shared/
RUN npm ci

# Where people reach this site and Aidapedia's, baked into the build (see packages/shared/vite.js).
ARG TABLETSGO_URL=/
ARG AIDAPEDIA_URL
ENV TABLETSGO_URL=${TABLETSGO_URL} AIDAPEDIA_URL=${AIDAPEDIA_URL}

COPY . .
RUN npm run build -w apps/tabletsgo

FROM nginx:alpine

COPY nginx.app.conf /etc/nginx/conf.d/default.conf
# Built into dist/tabletsgo/ (its folder on the shared site); here it is the whole site.
COPY --from=build /app/dist/tabletsgo /usr/share/nginx/html
