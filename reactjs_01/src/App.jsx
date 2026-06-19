import React from "react";
import Car from "./components/cars";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  
  const [cars,setcars] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3001/api/v1/cars').then(res => res.json()).then(data => setcars(data)).catch(err => console.log(err));
    console.log(cars);
  },[]);
  return (
    <div>
      <h1>Welcome to the car store</h1>
      <ul>
        <Car />
        <Car />
        <Car />
        <Car />
      </ul>
    </div>
  )
}

export default App;