import React, { useState } from "react";

function TodoItem({ todo, onDelete, onToggleComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [dueDate, setDueDate] = useState(todo.dueDate || "");

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(todo.id, editText, dueDate); // removed priority
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button className="save" onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span onClick={() => onToggleComplete(todo.id)}>{todo.text}</span>
          {todo.dueDate && (
            <span
              className={`due-date ${
                new Date(todo.dueDate) < new Date() && !todo.completed
                  ? "overdue"
                  : ""
              }`}
            >
              Duedate: {todo.dueDate}
            </span>
          )}
          <div className="actions">
            <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete" onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
