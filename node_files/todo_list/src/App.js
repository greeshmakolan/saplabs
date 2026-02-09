import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import ThemeToggle from "./components/ThemeToggle";
import TodoSearch from "./components/TodoSearch";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [dateFilter, setDateFilter] = useState("");

  /* ----------------- Local Storage ----------------- */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /* ----------------- CRUD ----------------- */
  const addTodo = (text, dueDate) => {
    if (!text.trim()) return;

    setTodos([
      {
        id: Date.now(),
        text,
        completed: false,
        dueDate
      },
      ...todos
    ]);
  };

  const deleteTodo = (id) =>
    setTodos(todos.filter((t) => t.id !== id));

  const toggleComplete = (id) =>
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

  const editTodo = (id, text, dueDate) =>
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, text, dueDate } : t
      )
    );

  const clearCompleted = () =>
    setTodos(todos.filter((t) => !t.completed));

  const markAllCompleted = () =>
    setTodos(todos.map((t) => ({ ...t, completed: true })));

  const activeCount = todos.filter((t) => !t.completed).length;

  /* ----------------- Filters ----------------- */
  let filteredTodos = todos.filter((t) => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  if (search.trim()) {
    filteredTodos = filteredTodos.filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (dateFilter) {
    filteredTodos = filteredTodos.filter(
      (t) => t.dueDate === dateFilter
    );
  }

  /* ----------------- UI ----------------- */
  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <h1>Todo App</h1>

      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* ===== Side-by-Side Layout ===== */}
      <div className="main-layout">

        {/* LEFT: Create Task */}
        <div className="left-panel">
          <h2>Create Task</h2>

          <TodoInput onAddTodo={addTodo} />
          <TodoSearch search={search} setSearch={setSearch} />

          <div className="date-filter">
            <label>Filter by Date:</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            <button onClick={() => setDateFilter("")}>Clear</button>
          </div>
        </div>

        {/* RIGHT: Task List */}
        <div className="right-panel">
          <h2>Task List</h2>

          <div className="filter-tabs">
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

          <TodoList
            todos={filteredTodos}
            onDelete={deleteTodo}
            onToggleComplete={toggleComplete}
            onEdit={editTodo}
          />

          <div className="bottom-actions">
            <button onClick={markAllCompleted}>Mark All Completed</button>
            <button onClick={clearCompleted}>Clear Completed</button>
            <div className="todo-count">{activeCount} items left</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
