# ==========================================
# YognaSetu Frontend - Multi-stage Dockerfile
# ==========================================

# Stage 1: Build React Application
FROM node:20-alpine AS build
WORKDIR /app

# Build arguments for Vite API Base URL
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy source and build production bundle
COPY . .
RUN npm run build

# Stage 2: High-performance Nginx Static Web Server
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Clean default files and copy built dist
RUN rm -rf ./*
COPY --from=build /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
