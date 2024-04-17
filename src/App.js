import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [item, setItem] = useState("");
  const [des, setDes] = useState("");
  const [counter, setCounter] = useState(0);

  const date = new Date();
  const showTime = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();


  function additem() {
    const task = {
      name: item,
      description: des,
      id: counter,
      done: false,
      time: showTime,
    };
    
    if(task.name !== "" && task.description !==""){
      setTaskList([...taskList, task]);
      setCounter(counter + 1);
      setItem("");
      setDes("");
    }
  }

  function remove(id) {
    setTaskList(taskList.filter((item) => item.id !== id));
  }

  function markasDone(id) {
    setTaskList(
      taskList.map((task) => (task.id === id ? { ...task, done: true } : task))
    );
  }

  function markasUnDone(id) {
    setTaskList(
      taskList.map((task) => (task.id === id ? { ...task, done: false } : task))
    );
  }

  function edditname(newname, id){
    setTaskList(
      taskList.map((task)=>(task.id === id ? {...task, name: newname} : task))
    )
  }

  function edditdes(newdes, id){
    setTaskList(
      taskList.map((task) => (task.id === id ? {...task, description: newdes} : task))
    )
  }

  function pressenter(e){
    if(e.key === "Enter"){
      additem();
    }
  }

  return (
    <div className="divBody">
      <div className="upperbody">
        <h1 className="TodoHeading">TO DO LIST </h1>


        {/* tasks which are incomplete */}
        <h3 className="UnCompletedTasks"> Tasks not completed</h3>
        <div className="UnCompLists">
          {taskList.map(
            (task, index) =>
              !task.done && (
                <div key={index} className="task">
                  <div className="taskname">
                    <input className="inputfeilds" type="text" value={task.name} onChange={(e) => {edditname(e.target.value, task.id)}} ></input>
                    <div className="buttons">
                      <button onClick={() => remove(task.id)}>-</button>
                      <button onClick={() => markasDone(task.id)}>
                        mark as done
                      </button>
                    </div>
                  </div>
                  <div className="des"><input className="inputfeilds"  value={task.description} onChange={(e)=>{edditdes(e.target.value, task.id)}}></input></div>
                  <div className="tasktime">{task.time}</div>
                </div>
              )
          )}
        </div>



        {/* tasks which are completed ------------------------------------------------------------------------- */}
        <h3 className="CompletedTasks"> Tasks completed</h3>
        <div className="CompLists">
          {taskList.map(
            (task, index) =>
              task.done && (
                <div key={index} className="task">
                  <div className="taskname">
                  <input type="text" className="inputfeilds"  value={task.name} onChange={(e) => {edditname(e.target.value, task.id)}}></input>
                    <div className="buttons">
                      <button onClick={() => remove(task.id)}>-</button>
                      <button onClick={() => markasUnDone(task.id)}>
                        Mark as UnDone
                      </button>
                    </div>
                  </div>
                  <div className="des"><input className="inputfeilds"  value={task.description} onChange={(e)=>{edditdes(e.target.value, task.id)}}></input></div>
                </div>
              )
          )}
        </div>
      </div>


{/* INPUT ELEMENTS------------------------------------------------------------------- */}
      <div className="inputElements">
        <div className="inputText">
          <input
            className="textInput"
            type="text"
            value={item}
            placeholder="Enter task"
            onChange={(e) => setItem(e.target.value)}
            onKeyUp={(e)=> pressenter(e)}
          ></input>
          <textarea
            className="textArea"
            type="text"
            value={des}
            placeholder="Enter description"
            onChange={(e) => setDes(e.target.value)}
            onKeyUp={(e)=> pressenter(e)}
          ></textarea>
        </div>
        <button className="addButton" onClick={additem}>
          +
        </button>
      </div>
    </div>
  );
}

export default App;
