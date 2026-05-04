<div align="center">

# CRM Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

A scalable, production-ready CRM Backend API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** via Prisma. Handles user authentication, role-based access control, support ticket management, and automated email notifications.

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#️-installation--setup) · [API Reference](#-api-overview) · [Folder Structure](#-folder-structure)

</div>

---

## 🚀 Project Overview

CRM Backend is a RESTful API that powers a Customer Relationship Management system. It supports three user roles — **User**, **Engineer**, and **Admin** — with a fully automated ticket lifecycle: tickets are created by users, intelligently auto-assigned to the least-loaded engineer, and tracked through resolution. Email notifications are sent via SendGrid at key lifecycle events.

---

## 🧠 Features

- **JWT Authentication** — Stateless auth via `x-access-token` header with 1-hour token expiry
- **Role-Based Access Control** — Three roles: `USER`, `ENGINEER`, `ADMIN` with middleware-enforced route guards
- **Ticket Management** — Full CRUD for support tickets with priority levels and status tracking
- **Smart Auto-Assignment** — New tickets are automatically assigned to the engineer with the fewest open tickets using a MongoDB aggregation pipeline
- **Email Notifications** — HTML email alerts on ticket creation via SendGrid
- **DTO Validation** — Request body validation using `class-validator` decorators on typed DTOs
- **Custom Error Handling** — Structured error classes (`BadRequest`, `NotFound`, `Unauthorised`, `InternalServerError`) for consistent API responses
- **Layered Architecture** — Clean separation across Controllers → Services → Repositories
- **Testing** — Jest + Supertest integration test suite with `ts-jest` for TypeScript support

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | [Bun](https://bun.sh/) |
| Framework | Express.js v5 |
| Language | TypeScript 5 |
| Database | MongoDB (Atlas) |
| ORM | Prisma 6 |
| Auth | JSON Web Tokens (`jsonwebtoken`) |
| Password Hashing | `bcryptjs` |
| Email | SendGrid (`@sendgrid/mail`) |
| Validation | `class-validator` |
| Testing | Jest + Supertest + ts-jest |

---

## ⚙️ Installation & Setup

### Prerequisites

- [Bun](https://bun.sh/) `>= 1.0`
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB instance)
- A [SendGrid](https://sendgrid.com/) account with a verified sender

### 1. Clone the repository

```bash
git clone https://github.com/m4nu-git/CRM-Backend.git
cd CRM-Backend
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in the values — see [Environment Variables](#-environment-variables) below.

### 4. Set up the database

```bash
bun run db:setup
```

This runs `prisma generate` to build the Prisma client and `prisma db push` to sync the schema to MongoDB.

### 5. Start the development server

```bash
bun run dev
```

The server will start at `http://localhost:3000` with hot reload enabled.

### 6. Run tests

```bash
bun test
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root with the following keys:

| Variable | Required | Description |
|---|---|---|
| `PORT` | Yes | Port the server listens on (e.g. `3000`) |
| `DATABASE_URL` | Yes | MongoDB connection string (Atlas or local) |
| `JWT_SECRET` | Yes | Secret key for signing JWT tokens |
| `SENDGRID_API_KEY` | Yes | API key from your SendGrid account |
| `MAIL_FROM` | Yes | Verified sender email address in SendGrid |
| `SALT_ROUNDS` | No | Bcrypt salt rounds — defaults to `10` |

```env
PORT=3000
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority"
JWT_SECRET=your_strong_secret_key
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
MAIL_FROM=noreply@yourdomain.com
SALT_ROUNDS=10
```

> **Note:** `MAIL_FROM` must be a sender verified in your SendGrid dashboard under **Settings → Sender Authentication**.

---

## 📂 Folder Structure

```
CRM-Backend/
├── src/
│   ├── index.ts                  # Server entry point — starts Express & listens
│   ├── app.ts                    # App setup — middleware registration
│   ├── config/
│   │   └── server.config.ts      # Centralised env var access
│   ├── routes/
│   │   ├── index.ts              # Mounts versioned routers
│   │   └── v1/
│   │       ├── index.ts          # v1 router index
│   │       ├── user.router.ts    # /api/v1/users routes
│   │       └── ticket.router.ts  # /api/v1/tickets routes
│   ├── controllers/
│   │   ├── user.controller.ts    # Handles HTTP for user operations
│   │   └── ticket.controller.ts  # Handles HTTP for ticket operations
│   ├── services/
│   │   ├── user.service.ts       # User business logic & auth
│   │   ├── ticket.service.ts     # Ticket lifecycle & auto-assignment logic
│   │   └── mailing.service.ts    # SendGrid email dispatch
│   ├── repositories/
│   │   ├── user.repository.ts    # Prisma queries for User model
│   │   └── ticket.repository.ts  # Prisma queries for Ticket model
│   ├── dtos/
│   │   ├── createUser.dto.ts     # Validated shape for user signup
│   │   ├── signin.dto.ts         # Validated shape for signin
│   │   ├── createTicket.dto.ts   # Validated shape for ticket creation
│   │   └── updateTicket.dto.ts   # Validated shape for ticket updates
│   ├── validators/
│   │   ├── auth.validators.ts    # isLoggedIn, isAdmin, isEngineer middleware
│   │   ├── user.validators.ts    # createUserValidator, signInValidator
│   │   └── ticket.validator.ts   # updateTicketValidator
│   ├── errors/
│   │   ├── genericError.ts       # Base error class
│   │   ├── badRequest.ts         # 400
│   │   ├── notFound.ts           # 404
│   │   ├── unauthorisedError.ts  # 401
│   │   └── internalServerError.ts# 500
│   ├── types/
│   │   ├── JwtDecodedUser.ts     # JWT payload shape
│   │   ├── RequestWithUser.ts    # Express Request extended with user
│   │   └── engineer.ts           # Engineer aggregation result shape
│   ├── utils/
│   │   ├── auth.utils.ts         # generateJWT, verifyToken helpers
│   │   └── response.utils.ts     # Standard error response shape
│   ├── mailers/
│   │   └── ticket.mailer.ts      # HTML email templates
│   └── prisma/
│       └── schema.prisma         # Prisma schema — User & Ticket models
├── tests/
│   └── app.test.ts               # Integration tests (Jest + Supertest)
├── jest.config.ts                # Jest configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
└── .env
```

---

## 🔄 API Overview

### Base URL

```
http://localhost:3000/api/v1
```

### Health Check

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/ping` | None | Server health check |

---

### Users — `/users`

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `POST` | `/users/signup` | None | — | Register a new user account |
| `POST` | `/users/signin` | None | — | Sign in and receive a JWT token |
| `GET` | `/users/:id` | None | — | Get a user by ID |
| `GET` | `/users/` | JWT | `ADMIN` | Get all users |

#### `POST /users/signup`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword"
}
```

#### `POST /users/signin`

```json
{
  "email": "jane@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "token": "<jwt_token>"
}
```

---

### Tickets — `/tickets`

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `POST` | `/tickets/` | JWT | `USER` | Create a new support ticket |
| `PATCH` | `/tickets/:id` | JWT | `ADMIN` or `ENGINEER` | Update ticket status, priority, or assignee |

#### `POST /tickets/`

```json
{
  "title": "Login page is broken",
  "description": "Users are unable to log in since the last deployment.",
  "clientName": "Acme Corp",
  "ticketPriority": 1
}
```

#### `PATCH /tickets/:id`

```json
{
  "status": "IN_PROGRESS",
  "ticketPriority": 2,
  "assignedTo": "engineer@example.com"
}
```

---

### Authentication

All protected routes require the JWT token in a request header:

```
x-access-token: <your_jwt_token>
```

---

### Ticket Status Values

| Status | Description |
|---|---|
| `OPEN` | Newly created, awaiting action |
| `IN_PROGRESS` | Actively being worked on |
| `ON_HOLD` | Paused pending further info |
| `RESOLVED` | Issue resolved |
| `CANCELLED` | Ticket cancelled |

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it.

---

<div align="center">
  Built with TypeScript & Express · Powered by MongoDB & Prisma
</div>
