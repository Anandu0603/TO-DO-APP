-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'done')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS tasks_created_at_idx ON tasks (created_at DESC);

-- Add sample tasks (optional)
INSERT INTO tasks (title, description, status) VALUES
  ('Complete project documentation', 'Write comprehensive documentation for the project', 'pending'),
  ('Fix login bug', 'Address the issue with user login functionality', 'pending'),
  ('Deploy application', 'Deploy the application to production environment', 'pending');