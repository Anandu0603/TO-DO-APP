# Task Manager Application

![Task Manager Demo](https://i.imgur.com/your-demo-image.png)

A modern, full-stack Task Manager application with user authentication, built with React, Node.js, Express, and Supabase.

## ✨ Features

- 🔐 User Authentication (Sign up, Login, Logout)
- 📝 Create, Read, Update, Delete tasks
- ✅ Mark tasks as complete/incomplete
- 🎨 Modern, responsive UI with smooth animations
- 🌓 Dark/Light mode support
- 🔄 Real-time updates
- 📱 Mobile-friendly design

## 🚀 Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Styled Components & CSS Modules
- Axios for API calls

### Backend
- Node.js & Express
- Supabase (Authentication & Database)
- JWT for authentication
- RESTful API

## 🛠️ Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account (for authentication and database)

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   - Create `.env` files in both `frontend` and `backend` directories
   - Add your Supabase credentials:
     ```
     # frontend/.env
     REACT_APP_SUPABASE_URL=your-supabase-url
     REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
     
     # backend/.env
     SUPABASE_URL=your-supabase-url
     SUPABASE_KEY=your-supabase-service-role-key
     JWT_SECRET=your-jwt-secret
     ```

4. **Run the application**
   ```bash
   # Start backend server
   cd backend
   npm start
   
   # In a new terminal, start frontend
   cd frontend
   npm start
   ```

   The application should now be running at `http://localhost:3000`

## 🌐 Deployment

### Vercel (Frontend)
1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Railway/Heroku (Backend)
1. Push your backend code to a separate repository
2. Connect to your preferred hosting service
3. Set up environment variables
4. Deploy!

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/)
- [Supabase](https://supabase.io/)
- [React Icons](https://react-icons.github.io/react-icons/)
- Responsive design

## Tech Stack

### Frontend
- React
- Axios for API requests
- CSS for styling

### Backend
- Node.js
- Express.js
- Supabase (PostgreSQL)

## Project Structure

```
/
├── frontend/           # React frontend application
│   ├── public/         # Public assets
│   ├── src/            # Source files
│   │   ├── components/ # React components
│   │   ├── services/   # API services
│   │   └── styles/     # CSS files
│   ├── package.json    # Frontend dependencies
│   └── README.md       # Frontend documentation
│
├── backend/            # Node.js backend application
│   ├── src/            # Source files
│   │   ├── controllers/ # Request handlers
│   │   ├── routes/      # API routes
│   │   └── config/      # Configuration files
│   ├── package.json     # Backend dependencies
│   └── README.md        # Backend documentation
│
└── README.md           # Main documentation
```

<!-- Deployment trigger: Update README to kick off a new Vercel build -->

## Setup and Running

### Prerequisites
- Node.js and npm installed
- Supabase account (or PostgreSQL database)

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` with your Supabase credentials.

4. Start the server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:5000 by default.

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:5000/api/tasks
   ```

4. Start the development server:
   ```
   npm start
   ```
   The application will open in your browser at http://localhost:3000.

## API Endpoints

| Method | Endpoint           | Description           |
|--------|--------------------|-----------------------|
| GET    | /api/tasks         | Get all tasks         |
| GET    | /api/tasks/:id     | Get a specific task   |
| POST   | /api/tasks         | Create a new task     |
| PUT    | /api/tasks/:id     | Update a task         |
| DELETE | /api/tasks/:id     | Delete a task         |

## Database Schema

### Tasks Table

| Column      | Type      | Description                       |
|-------------|-----------|-----------------------------------|
| id          | UUID      | Primary key                       |
| title       | VARCHAR   | Task title                        |
| description | TEXT      | Task description (optional)       |
| status      | VARCHAR   | Task status (pending/done)        |
| created_at  | TIMESTAMP | Creation timestamp                |