import React, { useEffect } from 'react';
import TaskItem from './TaskItem.jsx';
import '../styles/TaskList.css';

function TaskList({ tasks, onToggleStatus, onDeleteTask }) {
  // Debug: Log the tasks being received
  useEffect(() => {
    console.log('Tasks in TaskList:', tasks);
  }, [tasks]);

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-task-list">
        <p>No tasks found. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <h2>Your Tasks</h2>
      <div className="task-list">
        {tasks.map(task => {
          // Ensure each task has required properties
          if (!task || !task.id) {
            console.warn('Invalid task data:', task);
            return null;
          }
          
          return (
            <TaskItem
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onDeleteTask={onDeleteTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TaskList;