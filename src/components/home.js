import React, { Component } from 'react';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const Home = () => {
  const firstRender = useRef(true);
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const addToDo = (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') return;
    setTodos([
      ...todos,
      {
        text: inputValue,
        id: uuidv4(),
      },
    ]);
    setInputValue('');
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  useEffect(() => {
    if (firstRender.current) {
      console.log('true');
      firstRender.current = false;
    } else {
      localStorage.setItem('Todo', JSON.stringify([...todos]));
      console.log('This is not the first loaded page');
    }
  }, [todos]);

  useEffect(() => {
    if (localStorage.getItem('Todo') !== null) {
      const newTodos = localStorage.getItem('Todo');
      setTodos(JSON.parse([...todos, newTodos]));
    }
  }, []);

  return (
    <div className="container">
      <h1>To do</h1>
      <form onSubmit={addToDo}>
        <input
          autoFocus
          type="text"
          placeholder="To Do List"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button>To do</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <p>{todo.text}</p>
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
export default Home;
