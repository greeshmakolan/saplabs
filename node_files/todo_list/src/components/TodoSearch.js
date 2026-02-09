import React from "react";

function TodoSearch({ search, setSearch }) {
  return (
    <div className="todo-search">
      <input
        type="text"
        placeholder="Search todos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default TodoSearch;
