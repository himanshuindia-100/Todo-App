import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function EditTodo(){
    const[newtodo,updatenewtodo]= useState("");
    const API_URL = "http://localhost:5000";
    const {id}= useParams();
   console.log(id);
    const updateTodo=async(e)=>{
        try{
            e.preventDefault();         
        await axios.put(`${API_URL}/todos/${id}`,{description:newtodo});
        window.location="/";
        }
        catch(error){
            console.error(error.essage);
        }
    }
const gettodo=async()=>{
    const response=await axios.get(`${API_URL}/todos/${id}`);
    updatenewtodo(response.data[0].description);
}

useEffect(
    ()=>{
     gettodo();
      
    },[id]
);


return(
<div className="d-flex flex-column mx-auto my-5 p-4 border rounded shadow" style={{ maxWidth: "500px", backgroundColor: "#f9f9f9" }}>
  <h1 className="text-center mb-4">Update your ToDo:</h1>
  <hr className="mb-4" />
  <textarea
    className="form-control mb-4"
    rows="4"
    placeholder="Enter your updated ToDo..."
    onChange={(e) => updatenewtodo(e.target.value)}
    value={newtodo}
    style={{ resize: "none" }}
  />
  <div className="d-flex justify-content-end">
  <button className="btn btn-success" onClick={updateTodo}>
    Done
  </button>
  <button className="btn  ms-3 btn-danger " onClick={()=>window.location="/"}>
    Close
  </button>
  </div>
</div>

);
}

export default EditTodo;