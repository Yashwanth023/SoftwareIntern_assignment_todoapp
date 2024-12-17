import React, { useState } from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-main">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className="todo-title" onClick={() => setIsExpanded(!isExpanded)}>
          {todo.title}
        </span>
        <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
      </div>
      {isExpanded && todo.description && (
        <div className="todo-description">
          {todo.description}
        </div>
      )}
    </li>
  );
}

export default TodoItem;

