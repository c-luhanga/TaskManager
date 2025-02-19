# Task Management Application

A full-stack task management application built with React, NestJS, and PostgreSQL.

## 🚀 Live Demo

[Watch Demo Video](your-video-link-here)

## ✨ Features

-  User authentication (Register/Login)
-  Create, read, update, and delete tasks
-  Task completion tracking
-  User-specific task lists
-  Responsive design with Bootstrap

## 🛠️ Technology Stack

### Frontend

-  React 18 with TypeScript
-  Bootstrap 5 for styling
-  Vite for build tooling
-  React Router v6

### Backend

-  NestJS
-  TypeORM
-  PostgreSQL
-  JWT Authentication

## 📋 Prerequisites

-  Node.js (v14 or higher)
-  PostgreSQL (v12 or higher)
-  npm or yarn

## 💾 Database Setup

1. Install PostgreSQL and create a new database:

```sql
CREATE DATABASE taskdb;
CREATE USER taskuser WITH ENCRYPTED PASSWORD 'taskpassword';
GRANT ALL PRIVILEGES ON DATABASE taskdb TO taskuser;
GRANT ALL PRIVILEGES ON SCHEMA public TO taskuser;
```

2. Configure environment variables:

Create a `.env` file in the backend directory:

```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_USER=taskuser
DB_PASS=taskpassword
DB_NAME=taskdb
JWT_SECRET=your-secret-key
```

## 🔧 Installation & Setup

### Backend Setup

1. Navigate to backend directory and install dependencies:

```bash
cd backend
npm install
```

2. Start the development server:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory and install dependencies:

```bash
cd frontend
npm install
```

2. Create `.env` file in frontend directory:

```plaintext
VITE_API_URL=http://localhost:3000
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
npm run test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## 📁 Project Structure

```plaintext
taskmanagement/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── tasks/
│   │   │   ├── task.entity.ts
│   │   │   ├── tasks.controller.ts
│   │   │   └── tasks.service.ts
│   │   └── users/
│   │       └── user.entity.ts
│   └── test/
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── TaskList.tsx
    │   ├── pages/
    │   │   ├── Login.tsx
    │   │   └── Register.tsx
    │   └── services/
    │       └── api.ts
    └── tests/
```

## 🔒 API Endpoints

### Authentication

-  `POST /auth/register` - Register new user
-  `POST /auth/login` - Login user

### Tasks (Protected Routes)

-  `GET /tasks` - Get all tasks
-  `POST /tasks` - Create task
-  `PUT /tasks/:id` - Update task
-  `DELETE /tasks/:id` - Delete task

## 💡 Usage Examples

### Register a New User

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

## 💰 Salary Expectations

Expected monthly salary range: $8,000 - $12,000 USD, depending on the overall compensation package and benefits offered.

## 🚀 Future Improvements

1. Add task categories/labels
2. Implement task due dates
3. Add task sorting and filtering
4. Enable task sharing between users
5. Add email notifications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
