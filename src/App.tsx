import { useState } from 'react'
import './App.css'

function App() {
  const [count,setCount]= useState(4);

  function decrementFunction(){
    setCount(count => count-1);
  }
  
  function incrementFunction(){
    setCount(count => count+1);
  }

  return (
    <>
    <button onClick={decrementFunction}>-</button>
    <span>{count}</span>
    <button onClick={incrementFunction}>+</button>
     
    </>
  )
}

export default App
