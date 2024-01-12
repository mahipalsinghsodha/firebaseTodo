import React, { useState, useEffect } from "react";
import { fetchTodos, addTodo, deleteTodo, updateTodo } from "./FirebaseConfig";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const todoList = await fetchTodos();
      setTodos(todoList);
    };
    fetchData();
  }, []);

  const handleAddTodo = async () => {
    await addTodo({ task, timestamp: new Date() });
    const todoList = await fetchTodos();
    setTodos(todoList);
    setTask("");
  };

  const handleEditClick = (todo) => {
    setEditingTask(todo);
    setEditedTask(todo.task);
  };

  const handleEditTodo = async () => {
    if (editingTask !== null && editedTask.trim() !== "") {
      await updateTodo(editingTask.id, { task: editedTask });
      const todoList = await fetchTodos();
      setTodos(todoList);
      setEditingTask(null);
      setEditedTask("");
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    const todoList = await fetchTodos();
    setTodos(todoList);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>ToDO App</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTodo}>Add Task</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTask === todo ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={handleEditTodo}>Save</button>
              </>
            ) : (
              <>
                {`${todo.task} - ${
                  todo.timestamp
                    ? new Date(todo.timestamp).toLocaleString()
                    : "No timestamp"
                }`}
                <button onClick={() => handleEditClick(todo)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
