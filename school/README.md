# 🎓 School Management System

A modern, production-ready full-stack school management application with role-based access control, built with **Angular 20** and **Express.js/MongoDB**.

---

## 🚀 Features

### Authentication
- JWT-based authentication with bcrypt password hashing
- Login & Register with validation
- Protected routes with role-based guards
- HTTP interceptor for automatic token attachment

### Admin Panel (`/admin/*`)
- **Dashboard** — Overview with stats (total users, teachers, admins)
- **Teacher Management** — Full CRUD (Add, Edit, Delete teachers)
- **User Management** — View, edit roles, delete user accounts
- Search & filter functionality on all tables

### User Panel (`/user/*`)
- **Dashboard** — Welcome screen with teacher count
- **View Teachers** — Read-only card-based teacher directory

### UI/UX
- Modern sidebar navigation with collapsible toggle
- Responsive design (mobile-friendly)
- Loading skeletons & spinners
- Success/error toast notifications
- Smooth animations & transitions
- Premium design with gradient accents

---

## 📁 Project Structure

```
school/
├── backend/
│   ├── config/
│   │   ├── .env              # Environment variables
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── teacher.js        # Teacher CRUD logic
│   │   └── user.js           # User management + stats
│   ├── middleware/
│   │   └── auth.middleware.js # JWT auth + admin guard
│   ├── models/
│   │   ├── User.Model.js     # User schema (admin/user)
│   │   └── Teacher.Model.js  # Teacher schema
│   ├── routes/
│   │   ├── auth.js           # Login, Register, Get user
│   │   ├── teacher.js        # Teacher CRUD routes
│   │   └── user.js           # User management routes
│   ├── index.js              # Express server entry
│   └── package.json
│
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── guards/
│       │   │   └── auth.guard.ts        # Auth, Admin, Guest guards
│       │   ├── interceptors/
│       │   │   └── auth.interceptor.ts  # JWT token interceptor
│       │   ├── layouts/
│       │   │   ├── admin-layout/        # Admin sidebar layout
│       │   │   └── user-layout/         # User sidebar layout
│       │   ├── pages/
│       │   │   ├── login/               # Login page
│       │   │   ├── register/            # Register page
│       │   │   ├── admin/
│       │   │   │   ├── dashboard/       # Admin dashboard
│       │   │   │   ├── teachers/        # Teacher CRUD
│       │   │   │   └── users/           # User management
│       │   │   └── user/
│       │   │       ├── dashboard/       # User dashboard
│       │   │       └── teachers/        # Teacher view (read-only)
│       │   ├── services/
│       │   │   ├── auth.service.ts      # Auth logic
│       │   │   └── api.service.ts       # API calls
│       │   ├── app.config.ts            # Angular config
│       │   ├── app.routes.ts            # All routes (lazy-loaded)
│       │   └── app.ts                   # Root component
│       ├── environments/
│       ├── styles.scss                  # Global design system
│       └── index.html
```

---

## 🛠 Setup Instructions

### Prerequisites
- **Node.js** v18+
- **MongoDB Atlas** account (or local MongoDB)
- **npm** package manager

### 1. Backend Setup

```bash
cd school/backend

# Install dependencies
npm install

# Configure environment
# Edit config/.env with your MongoDB URI and JWT secret

# Start server
npm start
```

The backend runs on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd school/frontend

# Install dependencies
npm install

# Start dev server
npm start
```

The frontend runs on `http://localhost:4200`

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user (protected) |

### Teachers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/teacher` | Get all teachers |
| GET | `/api/teacher/:id` | Get single teacher |
| POST | `/api/teacher` | Create teacher (admin) |
| PUT | `/api/teacher/:id` | Update teacher (admin) |
| DELETE | `/api/teacher/:id` | Delete teacher (admin) |

### Users (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/stats` | Dashboard statistics |
| GET | `/api/users` | Get all users |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

---

## 📊 Database Models

### User
| Field | Type | Required | Default |
|-------|------|----------|---------|
| name | String | Yes | — |
| email | String | Yes (unique) | — |
| password | String | Yes (min 6) | — |
| role | String | No | "user" |

### Teacher
| Field | Type | Required |
|-------|------|----------|
| name | String | Yes |
| subject | String | Yes |
| experience | Number | Yes |
| email | String | Yes (unique) |
| phone | String | Yes |

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 20, TypeScript, SCSS |
| Backend | Express.js 5, Node.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT, bcryptjs |
| Design | Custom CSS Design System |
| Icons | Material Icons Round |
| Fonts | Inter (Google Fonts) |
