import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  // passing todo element
  return (
    <div>
      {/* We want a checkbox to check whether it is complete or not */}
      <label htmlFor="">
        {/* checked is a value here */}
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />

        {/* print out todo */}
        {todo.name}
      </label>
    </div>
  );
}
