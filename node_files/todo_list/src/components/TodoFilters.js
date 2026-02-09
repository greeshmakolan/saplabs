import React from "react";

function TodoFilters({ filter, setFilter, clearCompleted, markAllCompleted, activeCount }) {
  return (
    <div className="filters-container">
      <div className="left-buttons">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={filter === "Active" ? "active" : ""}
          onClick={() => setFilter("Active")}
        >
          Active
        </button>
        <button
          className={filter === "Completed" ? "active" : ""}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </div>

      <div className="right-buttons">
        <button onClick={markAllCompleted}>Mark All Completed</button>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>

      <div className="todo-count">{activeCount} items left</div>
    </div>
  );
}

export default TodoFilters;
