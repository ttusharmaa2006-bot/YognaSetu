# 🚀 YognaSetu - Complete Production Deployment Guide

This guide provides step-by-step instructions for deploying the **YognaSetu** full-stack welfare scheme discovery platform to production environments with all potential issues, errors, and CORS configurations solved in advance.

---

## 📑 Table of Contents
1. [Overview & Architecture](#overview--architecture)
2. [Prerequisites & Accounts](#prerequisites--accounts)
3. [Option 1: Recommended Cloud Deployment (Free Tier)](#option-1-recommended-cloud-deployment-free-tier)
   - [Step 1: MongoDB Atlas Database Setup](#step-1-mongodb-atlas-database-setup)
   - [Step 2: Deploy Backend to Render](#step-2-deploy-backend-to-render)
   - [Step 3: Deploy Frontend to Vercel](#step-3-deploy-frontend-to-vercel)
4. [Option 2: 1-Click Docker Compose Deployment](#option-2-1-click-docker-compose-deployment)
5. [Option 3: Railway Full-Stack Deployment](#option-3-railway-full-stack-deployment)
6. [Environment Variables Reference](#environment-variables-reference)
7. [Post-Deployment Verification Checklist](#post-deployment-verification-checklist)
8. [Comprehensive Troubleshooting Guide](#comprehensive-troubleshooting-guide)

---

## 🏗️ Overview & Architecture

* **Backend Service**: Spring Boot 3.3.x (Java 21), stateless JWT authentication, MongoDB connector, Spring Actuator, and Swagger / OpenAPI 3.
* **Frontend Service**: React 18 + Vite + Tailwind CSS SPA served via CDN (Vercel / Netlify / Render Static) or high-performance Nginx container.
* **Database**: MongoDB 7.0+ (MongoDB Atlas Cloud M0 Cluster or containerized MongoDB).

---

## 📋 Prerequisites & Accounts

Before deploying, ensure you have:
* A [GitHub Account](https://github.com) with the YognaSetu repository pushed.
* A [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) (Free M0 cluster).
* A [Render Account](https://render.com) (for Spring Boot backend).
* A [Vercel Account](https://vercel.com) (for React frontend).

---

## 🌐 Option 1: Recommended Cloud Deployment (Free Tier)

### Step 1: MongoDB Atlas Database Setup

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com).
2. Create a new **Free M0 Shared Cluster** (e.g., AWS / `ap-south-1` Mumbai or `us-east-1`).
3. Under **Security > Database Access**:
   - Create a database user (e.g., `yognasetu_user`) with password authentication and `readWriteAnyDatabase` privileges.
4. Under **Security > Network Access** (**CRITICAL**):
   - Click **Add IP Address** -> Choose **Allow Access from Anywhere** (`0.0.0.0/0`) so cloud hosts (Render/Railway/Vercel) can connect to the database.
5. Under **Deployments > Database > Connect**:
   - Select **Drivers (Java)** and copy your connection string:
     ```text
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/yognasetu_db?retryWrites=true&w=majority
     ```
   *(Ensure special characters in the password, e.g. `@` or `#`, are URL-encoded, like `%40` and `%23`)*.

---

### Step 2: Deploy Backend to Render

1. Log in to the [Render Dashboard](https://dashboard.render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository: `ttusharmaa2006-bot/YognaSetu`.
4. Configure service settings:
   - **Name**: `yognasetu-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Docker` (Render automatically detects `./backend/Dockerfile`)
   - **Region**: Closest to your database (e.g. Singapore or Oregon)
   - **Instance Type**: Free
   - **Health Check Path**: `/actuator/health` (or `/`)
5. Scroll down to **Environment Variables** and add:
   | Key | Value | Description |
   |---|---|---|
   | `PORT` | `8080` | Internal server port |
   | `MONGODB_URI` | `mongodb+srv://user:pass@cluster0.../yognasetu_db` | Your MongoDB Atlas connection URI |
   | `JWT_SECRET` | `YognaSetuSecureSuperSecretKeyForProductionAuthenticationTokens2026!` | Min 32+ characters / 256 bits |
   | `JWT_EXPIRATION_MS` | `86400000` | 24 Hours in milliseconds |
   | `CORS_ALLOWED_ORIGINS` | `*` | Or specify your frontend domain (e.g. `https://yogna-setu.vercel.app`) |
6. Click **Create Web Service**.
7. Once deployed, note down your live Backend URL:
   ```text
   https://yognasetu-backend.onrender.com
   ```
   **Verify Backend Health**:
   - Root index: `https://yognasetu-backend.onrender.com/` (returns `{"status":"UP", ...}`)
   - Actuator health: `https://yognasetu-backend.onrender.com/actuator/health` (returns `{"status":"UP"}`)
   - Swagger documentation: `https://yognasetu-backend.onrender.com/swagger-ui.html`

---

### Step 3: Deploy Frontend to Vercel

1. Log in to the [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Import your GitHub repository: `ttusharmaa2006-bot/YognaSetu`.
4. Configure Project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click `Edit` and select `frontend`
5. Expand **Environment Variables**:
   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `https://yognasetu-backend.onrender.com/api/v1` |
6. Click **Deploy**.
7. Vercel will build and assign your live domain (e.g., `https://yogna-setu.vercel.app`).
8. The included [vercel.json](file:///c:/Users/91969/Downloads/YognaSetu/frontend/vercel.json) ensures all deep links (`/schemes`, `/admin`, `/login`, `/profile`) resolve without 404 errors on page reload!

---

## 🐳 Option 2: 1-Click Docker Compose Deployment

If deploying to a Virtual Private Server (VPS like AWS EC2, DigitalOcean Droplet, Linode, or local machine):

### 1. Clone & Navigate
```bash
git clone https://github.com/ttusharmaa2006-bot/YognaSetu.git
cd YognaSetu
```

### 2. Launch Stack
```bash
docker-compose up -d --build
```

### 3. Verification
- **Frontend App**: `http://localhost:3000` (or `http://<your-vps-ip>:3000`)
- **Backend REST API**: `http://localhost:8080/api/v1/schemes`
- **Root Status**: `http://localhost:8080/`
- **Swagger Docs**: `http://localhost:8080/swagger-ui.html`

### 4. Stop Stack
```bash
docker-compose down
```

---

## 🚂 Option 3: Railway Full-Stack Deployment

1. Install Railway CLI or connect via [Railway.app](https://railway.app).
2. Click **New Project** > **Provision MongoDB**.
3. Click **Add Service** > **GitHub Repo** > Select `YognaSetu`:
   - Set Root directory: `/backend`
   - Set environment variable `MONGODB_URI` to Railway's `${{MongoDB.MONGO_URL}}`
   - Set `JWT_SECRET` to your secure 256-bit secret.
   - Set `CORS_ALLOWED_ORIGINS` to `*`.
4. Click **Add Service** > **GitHub Repo** > Select `YognaSetu`:
   - Set Root directory: `/frontend`
   - Set `VITE_API_BASE_URL` to `${{backend.RAILWAY_PUBLIC_DOMAIN}}/api/v1`
5. Click **Deploy**.

---

## 🔑 Environment Variables Reference

| Service | Environment Variable | Default / Example | Required | Description |
|---|---|---|---|---|
| **Backend** | `PORT` | `8080` | Optional | Port on which the Spring Boot application listens |
| **Backend** | `MONGODB_URI` | `mongodb://localhost:27017/yognasetu_db` | **Yes** | MongoDB connection string (Atlas cluster or local) |
| **Backend** | `JWT_SECRET` | `YognaSetuSecureSuperSecretKey...` | **Yes** | Secret key for signing and verifying JWT tokens (>= 32 chars) |
| **Backend** | `JWT_EXPIRATION_MS` | `86400000` | Optional | JWT validity duration (in milliseconds, 24 hours) |
| **Backend** | `CORS_ALLOWED_ORIGINS` | `*` | Optional | Allowed CORS origins (wildcard `*` or comma-separated URLs) |
| **Frontend** | `VITE_API_BASE_URL` | `http://localhost:8080/api/v1` | **Yes** | Public HTTP API base endpoint for backend |

---

## ✅ Post-Deployment Verification Checklist

1. [ ] **Root Status Check**: `GET https://<backend-domain>/` returns `{"status":"UP", "service":"YognaSetu API Server"}`.
2. [ ] **Actuator Healthcheck**: `GET https://<backend-domain>/actuator/health` returns `{"status":"UP"}`.
3. [ ] **Swagger Documentation**: Open `https://<backend-domain>/swagger-ui.html` and verify all endpoints load.
4. [ ] **Registration & Login**: Register a test user on the frontend and ensure authentication token is received.
5. [ ] **Public Schemes Feed**: Navigate to `/schemes` and verify live schemes render from MongoDB.
6. [ ] **Admin Portal**: Log in as admin and verify creation, edit, and deletion of schemes works cleanly.
7. [ ] **CORS Check**: Open browser DevTools (F12) -> Console and verify no `CORS header 'Access-Control-Allow-Origin' missing` errors occur.

---

## 🛠️ Comprehensive Troubleshooting Guide

### 1. Issue: Render Deployment Fails on Health Check (`/actuator/health`)
- **Cause**: Spring Security was blocking unauthenticated requests to `/actuator/**` with HTTP 401 Unauthorized.
- **Solution**: We added `.requestMatchers(HttpMethod.GET, "/", "/actuator/**", "/error").permitAll()` in [WebSecurityConfig.java](file:///c:/Users/91969/Downloads/YognaSetu/backend/src/main/java/com/yognasetu/config/WebSecurityConfig.java). In Render, you can use `/actuator/health` or `/` as the Health Check Path.

### 2. Issue: Browser Shows "Cross-Origin Request Blocked (CORS)" in Console
- **Cause**: Backend only allowed `localhost` origins by default.
- **Solution**: Set `CORS_ALLOWED_ORIGINS=*` in your backend environment variables (or specify your frontend URL like `https://yogna-setu.vercel.app`). The backend now uses dynamic `allowedOriginPatterns` which supports credentials alongside wildcards.

### 3. Issue: Reloading Deep Pages on Vercel Gives 404 (e.g. `/schemes/123` or `/admin`)
- **Cause**: Single Page Applications (SPAs) route client-side. Refreshing directly requests the path from the server.
- **Solution**: The included [vercel.json](file:///c:/Users/91969/Downloads/YognaSetu/frontend/vercel.json) rewrites all incoming requests `/(.*)` to `/index.html`. On Nginx, `try_files $uri $uri/ /index.html;` achieves the same.

### 4. Issue: "The connection string is invalid. Connection strings must start with either 'mongodb://' or 'mongodb+srv://'"
- **Cause**: The `MONGODB_URI` environment variable is not defined or is empty.
- **Solution**: Ensure `MONGODB_URI` is set in your Render / Railway environment variables. For local development, check [backend/.env](file:///c:/Users/91969/Downloads/YognaSetu/backend/.env).

### 5. Issue: MongoDB Atlas "MongoSocketOpenException / Connection timed out"
- **Cause**: IP Whitelist blocking cloud hosts.
- **Solution**: In MongoDB Atlas -> **Network Access** -> Ensure `0.0.0.0/0` (Allow Access from Anywhere) is active. Cloud hosts like Render and Railway have dynamic IP addresses that change on every deploy.

### 6. Issue: Mixed Content Warning (HTTPS frontend calling HTTP backend)
- **Cause**: Deployed Vercel frontend (`https://...`) trying to call an unencrypted backend (`http://...`).
- **Solution**: Always use `https://` in `VITE_API_BASE_URL` (e.g., `https://yognasetu-backend.onrender.com/api/v1`).
