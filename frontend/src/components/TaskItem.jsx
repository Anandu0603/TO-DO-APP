import React from 'react';
import '../styles/TaskItem.css';

function TaskItem({ task, onToggleStatus, onDeleteTask }) {
  const { id, title, description, status } = task;

  return (
    <div className={`task-item ${status === 'done' ? 'task-done' : ''}`}>
      <div className="task-content">
        <h3 className="task-title">{title}</h3>
        {description && <p className="task-description">{description}</p>}
        <div className="task-status">
          Status: <span className={`status-badge ${status}`}>{status}</span>
        </div>
      </div>
      
      <div className="task-actions">
        <button 
          className="toggle-status-button"
          onClick={() => onToggleStatus(id, status)}
        >
          {status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
        </button>
        
        <button 
          className="delete-button"
          onClick={() => onDeleteTask(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;