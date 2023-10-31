import './App.css';
import TaskForm from "./taskform";
import Task from "./tasks";
import { useEffect, useState } from 'react';
function App() {
  const [tasks,setTasks] = useState([]);
 
  useEffect(()=>{
    if(tasks.length===0) return;
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks([]); 
    }
  }, []);
  function addTask(name){
   setTasks(prev=>
    {
      return [...prev,{name:name,done:false}]
    })
  }

  function updateTask(taskindex,newdone){
      setTasks((prev) => {
        const updatedTasks = prev.map((task,index) => {
          if (index === taskindex) {
            return { ...task, done: newdone };
          }
          return task;
        });
    
        updatedTasks.sort((taskA, taskB) => {
          if (taskA.done && !taskB.done) {
            return 1; 
          } else if (!taskA.done && taskB.done) {
            return -1; 
          }
          return taskA.done - taskB.done; 
        });
    
        return updatedTasks;
      });
  }
  
  function removeTask(indexR){
    setTasks((prev) => {
      const newTasks = prev.filter((taskObj, index) => index !== indexR);
      if (newTasks.length === 0) {
        localStorage.removeItem('tasks');
      } else {
        localStorage.setItem('tasks', JSON.stringify(newTasks));
      }
      return newTasks;
    });
  } 

  
  return (
    <main>
        <h1>To-Do App</h1>
        <TaskForm onAdd={addTask}/>
        {tasks.map((task,index)=>(
          <Task {...task} 
          onTrash={()=>removeTask(index)}
          onToggle={done=>updateTask(index,done)}/>
          ))}
        </main>
  );
}

export default App;
