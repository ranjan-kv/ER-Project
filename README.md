# Task Manager App

A full-stack task management application built with Next.js and Node.js.

## What's This?

Simple web app where you can create an account, login, and manage your tasks. Built this for a frontend developer assignment.

## Tech Stack

**Frontend:**
- Next.js 15 (React framework)
- TailwindCSS for styling
- TypeScript

**Backend:**
- Node.js + Express
- MongoDB (using in-memory server for dev)
- JWT for auth

## Features

- User registration and login
- Create, edit, delete tasks
- Filter tasks by status and priority
- Search functionality
- Profile management
- Secure authentication

## Quick Start

### Backend
```bash
cd server
npm install
npm run dev
```
Server runs on http://localhost:5001

### Frontend
```bash
cd client
npm install
npm run dev
```
App runs on http://localhost:3000

## Project Structure

```
ProjectF/
├── server/          # Backend API
│   ├── models/      # Database models
│   ├── routes/      # API endpoints
│   └── middleware/  # Auth middleware
└── client/          # Frontend app
    ├── app/         # Next.js pages
    ├── components/  # React components
    └── lib/         # API client
```

## API Endpoints

**Auth:**
- POST `/api/auth/register` - Create account
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get profile
- PUT `/api/auth/updatedetails` - Update profile

**Tasks:**
- GET `/api/items` - Get all tasks
- POST `/api/items` - Create task
- PUT `/api/items/:id` - Update task
- DELETE `/api/items/:id` - Delete task

## Environment Setup

Create `.env` in server folder:
```
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/taskapp
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

Create `.env.local` in client folder:
```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## Security Features

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Protected routes
- Input validation on both client and server

## Notes

- MongoDB runs in-memory for development (no installation needed)
- All API calls are authenticated except login/register
- Frontend uses React Context for state management

## Screenshots

Login page has clean black and white design. Dashboard shows all your tasks with filters and search. Can add, edit, or delete tasks easily.

---

Built as part of frontend developer assignment. Code intentionally kept readable and straightforward.
