import React, { useState, useEffect } from "react";
import ToDo from "../src/components/ToDo";
import { getAllToDo, addToDo , updateToDo, deleteToDo} from "../src/utils/HandleApi";
import "./App.css";
function App() {
  // const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) =>{
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }
  return (
    <div className="App">
      <h1>My Todo List</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              placeholder="Please Add your Task !!"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
          </div>
          {/* <div className="todo-input-item">
            <label>Description</label>
            <input type="text" placeholder="Please Add Description !!"></input>
          </div> */}
          <div className="todo-input-item">
            <button
              type="button"
              className="primaryBtn"
              onClick={
                isUpdating
                  ? () =>
                      updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                  : () => addToDo(text, setText, setToDo)
              }
            >
              {isUpdating ? "Update" : "Add"}
            </button>
          </div>
        </div>
        <div className="list">
          {toDo.map((item) => 
            <ToDo key={item.id} text={item.text} updateMode = {() => updateMode(item._id, item.text)}
            deleteToDo={()=>deleteToDo(item._id,setToDo)}/>
          )}
        </div>

        {/* <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          <div className="todo-list-item">
            <h3>Task</h3>
            <p>Description</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
