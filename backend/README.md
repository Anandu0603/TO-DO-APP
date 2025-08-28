# Task Manager API

This is the backend API for the Task Manager application built with Node.js, Express, and Supabase (PostgreSQL).

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Supabase credentials
4. Run the development server:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Database Schema

### Tasks Table

- `id` - UUID (Primary Key)
- `title` - Text (Required)
- `description` - Text
- `status` - Text (pending/done)
- `created_at` - Timestamp with timezone