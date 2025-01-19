import React ,{ useState } from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css'
import InputTodo from './components/inputTodo';
import ListTodo from './components/listTodo';
import EditTodo from './components/editTodo';

function App() {

  const router= createBrowserRouter(
    [
     {
       path: "/",
       element: 
       <div>
      <InputTodo/>
      <ListTodo/>
    </div>
     },
     {
       path: "/edittodo/:id",
       element: 
       <div>
        <EditTodo/>
       </div>
     },
     
    ]
   );

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
