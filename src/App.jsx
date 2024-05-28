import React, { useState } from 'react'
import TopBar from './assets/components/TopBar'



function App() {
  let [todo,setTodo]=useState([
    {
    id:1,
    title:" Office Task-1",
    description:"This is the complete Process of First office task.",
    status:false

  },
  {
    id:2,
    title:" Office Task-2",
    description:"This is the idea of second task",
    status:true
    
  },
  {
    id:3,
    title:" Office Task-3",
    description:"This is the implementation of third task",
    status:false
    
  }
])
let [completed,setCompleted]=useState("All")
  return <>
  <TopBar todo={todo} setTodo={setTodo} completed={completed} setCompleted={setCompleted}/>
  </>
}

export default App