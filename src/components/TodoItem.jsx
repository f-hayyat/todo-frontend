import { TodoItemsContext } from "../store/TodoItemsContext";
import Button from "./Button";
import { useContext, useState } from "react";
import { todoItemToClientModel } from "../utils/ModelUtil";
import React from "react";
const TodoItem = ({ id, todoText, todoDate, completed }) => {
  const { deleteTodoItem } = useContext(TodoItemsContext);
  const [isCompleted, setIsCompleted] = useState(completed);

  const deleteHandler = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    fetch(`${apiUrl}/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const clientData = todoItemToClientModel(data);
        console.log(clientData);
        deleteTodoItem(clientData.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleCompletionHandler = async (e) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: e.target.checked
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update todo status");
      }

      const data = await response.json();
      setIsCompleted(data.completed);
      
      const textElement = e.target.parentElement.querySelector('.todo-text');
      if (data.completed) {
        textElement.classList.add('line-through', 'text-gray-400');
      } else {
        textElement.classList.remove('line-through', 'text-gray-400');
      }

    } catch (error) {
      console.error("Error updating todo status:", error);
      e.target.checked = !e.target.checked; // Revert checkbox state on error
      alert("Failed to update todo status. Please try again.");
    }
  };

  const formattedDate = new Date(todoDate).toLocaleDateString("en-PK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-b border-gray-200 gap-2">
        <div className="flex items-center w-full sm:w-auto sm:flex-1 sm:max-w-[40%]">
          <input 
            type="checkbox"
            className="w-4 h-4 mr-3 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 flex-shrink-0"
            checked={isCompleted}
            onChange={toggleCompletionHandler}
          />
          <span className={`todo-text text-gray-800 break-words ${isCompleted ? 'line-through text-gray-400' : ''}`}>
            {todoText}
          </span>
        </div>
        <div className="w-full sm:w-32 text-gray-600">{formattedDate}</div>
        <div className="w-full sm:w-24">
          <Button btnType="danger" btnText="Delete" handler={deleteHandler} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
