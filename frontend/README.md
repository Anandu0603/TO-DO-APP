# Task Manager Frontend

## Overview
This is the frontend for the Task Manager application, built with React. It provides a user interface for managing tasks, including creating, viewing, updating status, and deleting tasks.

## Features
- View all tasks
- Add new tasks
- Mark tasks as complete/pending
- Delete tasks
- Responsive design

## Prerequisites
- Node.js and npm installed
- Backend API running (see backend README for setup)

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:5000/api/tasks
   ```
   Adjust the URL if your backend is running on a different port or host.

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
src/
├── components/       # React components
│   ├── App.js        # Main application component
│   ├── TaskForm.js   # Form for adding new tasks
│   ├── TaskList.js   # List of tasks
│   └── TaskItem.js   # Individual task component
├── services/         # API service functions
│   └── taskService.js # Functions for API communication
├── styles/           # CSS files
│   ├── index.css     # Global styles
│   ├── App.css       # App component styles
│   ├── TaskForm.css  # TaskForm component styles
│   ├── TaskList.css  # TaskList component styles
│   └── TaskItem.css  # TaskItem component styles
└── index.js         # Application entry point
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Runs the test suite
- `npm eject`: Ejects from create-react-app

## Connecting to the Backend

The frontend communicates with the backend API using axios. The API URL is configured in the `.env` file and can be changed as needed.

Make sure the backend server is running before starting the frontend application.
is project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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