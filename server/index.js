import express from "express";
import bodyParser from "body-parser";   
import pg from "pg";
import cors from "cors";

const app=express();
const port=5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"pern_todo",
    password:"9431848227",
    port:5432
});

db.connect();

//routes
//create a todo
app.post("/add",async (req,res)=>{
try {
    const description=req.body.description;
    console.log(description);
    const new_todo=await db.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description]);
    res.json(new_todo.rows[0]);
} catch (error) {
    console.log(error.message);
}
});

//get all todos
app.get("/todos",async(req,res)=>{
    try {
        const alltodos=await db.query("SELECT * FROM todo");
        res.json(alltodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})

//get a todo
app.get("/todos/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const todo= await db.query("SELECT * FROM todo WHERE todo_id=$1",[id]);
        res.json(todo.rows);
    } catch (error) {
        console.log(error.message);
    }
})


//update a todo
app.put("/todos/:id",async(req,res)=>{
    try{
const id=req.params.id;
const note=req.body.description;
const updated=await db.query("UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *",[note,id]);
res.json(updated.rows[0]);
    }
    catch(error){
        console.log(error.message);
    }
});


//delte a todo
app.delete("/todos/:id",async(req,res)=>{
    const id=req.params.id;
    try {
        await db.query("DELETE FROM todo WHERE todo_id=$1",[id]);
        res.send("deleted successfully");
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(port,()=>{
    console.log(`server running on  http://localhost:${port}`);
})