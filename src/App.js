import React, { useState, useRef, useEffect } from "react"; // In order to use state in function component we need to use useState HOOK
// useRef HOOK alows to reference elements inside our html ( in our case input field, so we can have acces to it)
// useEffect is a hook to store inside local storage so our todos will stay after page reload
import "./App.scss";
import TodoList from "./TodoList";
// Download this funct to generate random id so we dont have an error of duplicate keys
import { v4 as uuidv4 } from "uuid";

// variable for localStorage in useEffect
const LOCAL_STORAGE_KEY = "todosApp.todos";

function App() {
  // Call useState function where we want to pass our default state(empty array). Set this to var
  // useState returns an array so we can destructure that array
  // First element is all of our todos, and second is a func that allows us to update our todos
  // Inside useState we want an object
  const [todos, setTodos] = useState([
    // { id: 1, name: "Todo 1", complete: false },
  ]);
  // creating todoNameRef for hook
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);
  // useEffect is a funct which takes as first param another funct
  // every time something changes we want to call that first funct
  // way to determine when to call that function is we pass an array of properties, so everytime something changes in that array we run function
  useEffect(() => {
    // we save that array everytime something changes within them
    // We give key to that item
    // We need to make sure we pass todos as a string as second parametr
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  });

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }
  // take in event parametr
  function handleAddTodo(e) {
    // to access current variable of our input
    const name = todoNameRef.current.value;
    // if they try add empty todo we just return without adding
    if (name === "") return;
    // Setting todos. Use prevTodos as a funct call which will give us prevTodos which allows us to change that

    setTodos((prevTodos) => {
      // now our todos will be equal to prevTodos and we want to spread it over our array and add a new todo to that list
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          name: name, // to show the name we entered in input field
          complete: false,
        },
      ];
    });
    // Setting null for clearing input field after adding
    todoNameRef.current.value = null;
    console.log(name);
  }

  function handeClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }
  return (
    // this return can only return one thing so we need to wrap it inside empty element(fragment)
    <>
      {/* we have prop todos and we want pass todos variable to that prop (name of that prop could be anything*/}
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      {/* useRef hook here  */}
      <input ref={todoNameRef} type="text"></input>
      {/* add event lister to add todo btn */}
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handeClearTodos}>Clear Complete</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to Do</div>
    </>
  );
}

export default App;
