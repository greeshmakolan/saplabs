import React, { useState } from "react";

function TodoInput({ onAddTodo }) {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAddTodo(input, dueDate); // remove priority parameter
    setInput("");
    setDueDate("");
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        placeholder="Add a new todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button className="add" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default TodoInput;
