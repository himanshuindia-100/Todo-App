import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListTodo() {
    const [todos, setTodo] = useState([]);
    const API_URL = "http://localhost:5000";

    const gettodos = async () => {
        try {
            const response = await axios.get(`${API_URL}/todos`);
            setTodo(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error.message);
            alert("Failed to fetch todos. Check console for details.");
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/todos/${id}`);
            setTodo((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error.message);
            alert("Failed to delete todo. Check console for details.");
        }
    };

    useEffect(() => {
        gettodos();
    }, []);

    return (
        <div className="d-flex px-5 mx-5 justify-content-center">
            <table className="table border-row-primary table-primary text-center mt-5">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {todos.map((todo) => (
                        <tr>
                            <td>{todo.description}</td>
                            <td>
                                
                                <Link to={"/edittodo/"+`${todo.todo_id}`}>
                                    <button className="btn btn-warning">Edit</button>
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListTodo;
