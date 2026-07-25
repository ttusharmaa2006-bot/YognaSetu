# YognaSetu - Government Scheme Discovery Platform

**YognaSetu** is a production-inspired, full-stack welfare scheme discovery platform designed to connect citizens (students, farmers, women, and marginalized communities) with Central and State Government schemes.

The platform provides a centralized, single-window discovery experience where users can search, filter, and inspect detailed scheme eligibility rules, required documentation, and direct links to official government application portals.

---

## 💻 Tech Stack

### Backend
* **Java 21**
* **Spring Boot 3.3.x**
* **Spring Security 6** (Stateless JWT Token Authentication)
* **Spring Data MongoDB** (Scheme schemas & user persistence)
* **Maven** (Dependency resolution & build automation)
* **Lombok** (Boilerplate reduction for models/DTOs)
* **Swagger / OpenAPI 3** (REST API verification UI)

### Frontend
* **React 18** (Vite build engine)
* **Tailwind CSS** (Modern utility design layout)
* **React Router Dom 6** (Dynamic client-side routing)
* **React Hook Form** (Robust client-side form validation)
* **Axios** (API endpoint request client with JWT interceptor)
* **Lucide React** (Vector icons)
* **React Hot Toast** (Toast notification popups)

---

## 📁 Architecture & Folder Structure

```text
YognaSetu/
├── backend/                   # Spring Boot 3 REST API Server
│   ├── pom.xml                # Maven dependencies
│   └── src/main/
│       ├── java/com/yognasetu/
│       │   ├── YognaSetuApplication.java # Spring Boot main entry
│       │   ├── config/        # WebMvc, WebSecurity, Swagger configs
│       │   ├── controller/    # Auth, Scheme, User, and Admin controllers
│       │   ├── dto/           # Request/Response data transfer objects
│       │   ├── enums/         # User roles and scheme types
│       │   ├── exception/     # Global Exception Handlers
│       │   ├── model/         # User, Scheme, and Eligibility entities
│       │   ├── repository/    # UserRepository and SchemeRepository interfaces
│       │   └── security/      # JWT Service, filters, authentication principal
│       └── resources/
│           ├── application.properties # Server port, MongoDB URI & JWT secret bindings
│           └── application-prod.yml   # Production profile configuration
└── frontend/                  # React Vite Client Web Application
    ├── package.json           # Scripts and dependencies
    ├── vite.config.js         # Vite configuration
    ├── tailwind.config.js     # Tailwind CSS theme extension
    ├── .env                   # Environment variable (VITE_API_BASE_URL)
    └── src/
        ├── App.jsx            # Entry router wrapper & Toaster
        ├── main.jsx           # Client DOM render boot
        ├── components/        # Reusable Loader, Navbar, Footer, ProtectedRoute, DeleteModal, SchemeForm
        ├── context/           # AuthContext managing logins, JWT token, and session storage
        ├── layouts/           # MainLayout template boundary
        ├── pages/             # Home, About, AllSchemes, SchemeDetails, Login, Register, NotFound
        │   └── admin/         # AdminDashboard, ManageSchemes, CreateScheme, EditScheme
        ├── services/          # Custom Axios client with request/response interceptors
        └── utils/             # Constants & environment helpers
```

---

## 🔑 Environment Variables

### Backend Configuration

Configure environment variables or set them in your deployment platform:

| Parameter | Default Value | Description |
|---|---|---|
| `PORT` | `8080` | Backend HTTP server listening port |
| `MONGODB_URI` | `mongodb://localhost:27017/yognasetu_db` | MongoDB connection URI |
| `JWT_SECRET` | `YognaSetuSecureSuperSecretKey...` | Base64 or raw key for JWT token signing |
| `JWT_EXPIRATION_MS` | `86400000` | Token expiration time in milliseconds (24 hours) |

### Frontend Configuration

Create a `.env` file inside `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

## 🚀 REST API Endpoints Table

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Public | Register a new user account |
| `POST` | `/api/v1/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/v1/auth/me` | Authenticated | Fetch current authenticated user session |
| `GET` | `/api/v1/schemes` | Public | Fetch all active government schemes |
| `GET` | `/api/v1/schemes/latest` | Public | Fetch latest 6 active schemes for homepage |
| `GET` | `/api/v1/schemes/{id}` | Public | Fetch scheme details by ID |
| `GET` | `/api/v1/schemes/search?keyword=` | Public | Search schemes by title, description, category, or department |
| `GET` | `/api/v1/schemes/category/{category}` | Public | Filter active schemes by category name |
| `POST` | `/api/v1/schemes` | Admin Only | Create a new government scheme |
| `PUT` | `/api/v1/schemes/{id}` | Admin Only | Update an existing scheme by ID |
| `DELETE` | `/api/v1/schemes/{id}` | Admin Only | Deactivate/delete a scheme by ID |

---

## 🛠️ Local Installation & Running Instructions

### 1. Database Setup (MongoDB)
Ensure MongoDB Community Server is running on port `27017` with database `yognasetu_db`.

### 2. Run Backend (Spring Boot)
```bash
cd backend
mvn clean compile
mvn spring-boot:run
```
- Swagger API Docs: `http://localhost:8080/swagger-ui.html`

### 3. Run Frontend (React Vite)
```bash
cd frontend
npm install
npm run dev
```
- Local Web Application: `http://localhost:5173`

---

## 🌐 Production Deployment

Refer to the complete [Deployment Guide](docs/deployment_guide.md) for deploying:
- **Backend**: Render Web Service + MongoDB Atlas
- **Frontend**: Vercel Static Web App

---

## 📄 License & Author

- **Author**: YognaSetu Development Team
- **License**: MIT License
