import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos, toggleTodo }) {
  // passing todos as props
  return (
    /* Rendering todos. We need to put {} so i will be seen as JS code */
    /* Inside of an array loop over all of our todos  */
    todos.map((todo) => {
      // for each todo we want to return our Component and pass it our todo
      // React doesnt know how to update each of todo properly so it needs to have a key
      //   Everytime with map method it will render all todos, but we want to render only one that have changed so we set key for efficiency purposes
      // In our case the name todo will be unique so we use it as a key
      return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />;
    })
  );
}
