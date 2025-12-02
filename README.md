# Scalable Web App with Authentication & Dashboard

A full-stack MERN application featuring secure JWT authentication, task management, and a modern UI. Built with scalability and security in mind.

## 🚀 Features

### Frontend
- **Next.js 15** with App Router
- **TailwindCSS** for modern, responsive design
- **JWT Authentication** with protected routes
- **React Context** for state management
- **Real-time validation** (client + server-side)
- **Search & Filter** functionality
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js/Express** REST API
- **MongoDB** with Mongoose ODM
- **JWT** for stateless authentication
- **Bcrypt** password hashing
- **Joi** validation middleware
- **CORS** enabled for cross-origin requests

### Security Features
- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ Input validation (client & server)
- ✅ Error handling middleware
- ✅ CORS configuration

## 📁 Project Structure

```
ProjectF/
├── server/                 # Backend (Node.js/Express)
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── middleware/
│   │   └── auth.js        # JWT auth middleware
│   ├── models/
│   │   ├── User.js        # User schema
│   │   └── Item.js        # Task/Item schema
│   ├── routes/
│   │   ├── auth.js        # Authentication routes
│   │   └── items.js       # CRUD routes
│   ├── .env               # Environment variables
│   ├── index.js           # Server entry point
│   └── package.json
│
└── client/                # Frontend (Next.js)
    ├── app/
    │   ├── login/         # Login page
    │   ├── register/      # Registration page
    │   ├── dashboard/     # Dashboard (protected)
    │   ├── layout.tsx     # Root layout
    │   └── page.tsx       # Landing page
    ├── components/
    │   └── ProtectedRoute.tsx
    ├── context/
    │   └── AuthContext.tsx
    ├── lib/
    │   └── api.ts         # API client
    ├── types/
    │   └── index.ts       # TypeScript types
    └── package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)

### 1. Clone & Install

```bash
cd ProjectF

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Configuration

#### Backend (`server/.env`)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auth-app
JWT_SECRET=your-secret-key-change-this-in-production-12345
JWT_EXPIRE=7d
```

#### Frontend (`client/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (update MONGODB_URI accordingly)
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# App runs on http://localhost:3000
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Get Current User
```http
GET /auth/me
Authorization: Bearer <token>

Response (200):
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Items (Tasks) Endpoints

#### 1. Get All Items
```http
GET /items?search=task&status=pending&priority=high
Authorization: Bearer <token>

Response (200):
[
  {
    "_id": "...",
    "title": "Complete project",
    "description": "Finish the web app",
    "status": "in-progress",
    "priority": "high",
    "user": "...",
    "createdAt": "2024-12-02T10:00:00.000Z",
    "updatedAt": "2024-12-02T10:00:00.000Z"
  }
]
```

#### 2. Get Single Item
```http
GET /items/:id
Authorization: Bearer <token>

Response (200):
{
  "_id": "...",
  "title": "Complete project",
  ...
}
```

#### 3. Create Item
```http
POST /items
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "pending",      // optional: pending | in-progress | completed
  "priority": "medium"      // optional: low | medium | high
}

Response (201):
{
  "_id": "...",
  "title": "New Task",
  ...
}
```

#### 4. Update Item
```http
PUT /items/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "completed",
  "priority": "high"
}

Response (200):
{
  "_id": "...",
  "title": "Updated Task",
  ...
}
```

#### 5. Delete Item
```http
DELETE /items/:id
Authorization: Bearer <token>

Response (200):
{
  "message": "Item removed"
}
```

## 🧪 Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get items (replace <TOKEN> with actual token)
curl -X GET http://localhost:5000/api/items \
  -H "Authorization: Bearer <TOKEN>"

# Create item
curl -X POST http://localhost:5000/api/items \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Task description","status":"pending","priority":"medium"}'
```

## 🎨 UI/UX Highlights

- **Gradient Backgrounds** - Modern aesthetic with subtle gradients
- **Smooth Animations** - Hover effects and transitions
- **Card-based Layout** - Clean, organized task cards
- **Form Validation** - Real-time feedback
- **Loading States** - Skeleton screens and spinners
- **Responsive Design** - Works on all screen sizes
- **Color-coded Status** - Visual priority and status indicators

## 🔒 Security Practices

1. **Password Hashing**: Passwords are hashed using bcrypt with salt rounds
2. **JWT Tokens**: Stateless authentication with 7-day expiration
3. **Protected Routes**: Middleware verification for all authenticated endpoints
4. **Input Validation**: Joi validation on backend, HTML5 validation on frontend
5. **Error Handling**: Comprehensive error messages without exposing sensitive data
6. **CORS Configuration**: Controlled cross-origin resource sharing

## 📈 Scalability Considerations

### Current Architecture
- Monorepo structure for easy development
- RESTful API design
- Modular component structure
- Centralized state management

### Production Scaling Strategy

1. **Frontend**
   - Deploy to Vercel/Netlify with CDN
   - Environment-based API URLs
   - Code splitting and lazy loading
   - Image optimization

2. **Backend**
   - Deploy to AWS/Digital Ocean/Heroku
   - Use MongoDB Atlas (managed, auto-scaling)
   - Implement rate limiting
   - Add Redis for caching
   - Load balancing with multiple server instances

3. **Database**
   - Index frequently queried fields
   - Implement pagination for large datasets
   - Consider sharding for massive scale
   - Regular backups and replication

4. **Additional Enhancements**
   - Add API versioning (/api/v1/)
   - Implement refresh tokens
   - Add logging (Winston, Morgan)
   - Set up CI/CD pipeline
   - Add monitoring (Sentry, DataDog)
   - Implement WebSockets for real-time updates

## 📝 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile management
- [ ] File uploads (avatars, attachments)
- [ ] Real-time notifications
- [ ] Team collaboration features
- [ ] Analytics dashboard
- [ ] Export data (CSV, PDF)
- [ ] Dark mode
- [ ] Multi-language support

## 🤝 Contributing

This is a demonstration project built for educational purposes. Feel free to fork and extend!

## 📄 License

MIT License - feel free to use this project for learning or as a starting point for your applications.

---

**Note**: This application demonstrates core concepts of modern web development including authentication, CRUD operations, and scalable architecture. For production use, ensure you update security keys, implement additional security measures, and follow best practices for deployment.
