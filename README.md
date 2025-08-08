# Online-Library-System_BE
# 📚 Online Library System – Backend

This is the backend service for the **Online Library System**, developed using **Node.js, Express, TypeScript**, and **MongoDB**. It provides a RESTful API for managing users, books, borrowing & returning, and admin dashboard functionalities.

---

## 🚀 Features

- ✅ User Authentication with JWT
- ✅ Role-based Access Control (Admin, Librarian, Member)
- ✅ Book CRUD Operations
- ✅ Borrow & Return System
- ✅ Overdue Tracking
- ✅ Admin Analytics API Endpoints

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **JWT** for Authentication
- **Bcrypt** for Password Hashing
- **Dotenv** for Environment Variables
- **Nodemon** for Development
- **Postman** for Testing APIs

---

## 📂 Project Structure

```
/backend
│
├── src/
│   ├── config/          # DB connection & environment setup
│   ├── controllers/     # Route handler logic
│   ├── middlewares/     # Auth, error handling
│   ├── models/          # Mongoose Schemas
│   ├── routes/          # API Routes
│   ├── utils/           # Helper functions
│   └── index.ts         # Main server entry
│
├── .env
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file in the root with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Getting Started

### 📦 Install dependencies

```bash
npm install
```

### ▶️ Start development server

```bash
npm run dev
```

### ⚙️ Build for production

```bash
npm run build
```

---

## 🔌 API Endpoints Overview

| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | `/api/auth/register`   | Register a new user            |
| POST   | `/api/auth/login`      | Login and get JWT token        |
| GET    | `/api/books`           | Get all books                  |
| POST   | `/api/books`           | Add new book (Admin only)      |
| PUT    | `/api/books/:id`       | Update book info               |
| DELETE | `/api/books/:id`       | Delete a book                  |
| POST   | `/api/borrow/:bookId`  | Borrow a book                  |
| POST   | `/api/return/:bookId`  | Return a borrowed book         |

-------------------------------------------------------------------------------------------------------
