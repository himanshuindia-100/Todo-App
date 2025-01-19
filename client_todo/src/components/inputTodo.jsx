import React, { useState } from "react";
import axios from "axios";

function InputTodo(){

const API_URL = "http://localhost:5000";
const[description, setdescription]=useState("");

function createTodo(event){
    const value=event.target.value;
    setdescription(value);
}

const submitForm= async(event)=>{
    event.preventDefault();
    if(description!=""){
    try{
    const todo=await axios.post(`${API_URL}/add`,{description});
     window.location="/";
    setdescription("");
    }
    
    catch(error){
        console.log(error.message);
    }
}
};

return(
<div>
<h1 className="text-center mt-5">Create Todo</h1>
<form className="d-flex pt-5 px-5 justify-content-around " >
    <input  type="text" className=" form-control " placeholder="Write your To-do here" value={description} onChange={createTodo} />
    <button className=" btn btn-success" onClick={submitForm}>Add</button>
</form>
</div>
);
}

export default InputTodo;