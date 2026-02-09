import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onToggleComplete, onEdit }) {
  if (todos.length === 0) return <p className="empty-list">No todos found!</p>;
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
