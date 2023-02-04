import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../App.css";

const Todo = () => {
  // A specific todo
  const [todo, setTodo] = useState("");

  // List of todos
  const [todos, setTodos] = useState([]);

  // Add a new document in collection "todos"
  const addTodo = async (e) => {
    await addDoc(collection(db, "todos"), {
      todo: todo,
    });
  };

  const fetchPost = async () => {
    // Get collection called "todos"
    const querySnapshot = await getDocs(collection(db, "todos"));

    const listOfTodos = [];

    querySnapshot.forEach((doc) => {
      // Add it to your todo array
      listOfTodos.push(doc.data());

      console.log(doc.id, " => ", doc.data());
    });

    // set the list
    setTodos(listOfTodos);
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="todo-container">
      <div className="todo">
        <h1 className="header">Todo-App</h1>

        <div>
          <div>
            <input
              type="text"
              placeholder="What do you have to do today?"
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" onClick={addTodo}>
              Submit
            </button>
          </div>
        </div>

        <div className="todo-content">
          {todos?.map((todo, i) => (
            <p key={i}>{todo.todo}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Todo;
