import { TodoItemsContext } from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";
import Button from "./Button";
import { useRef, useContext } from "react";


const AddTodo = () => {
  const todoTextInput = useRef();
  const todoDateInput = useRef();
  const { addTodoItem } = useContext(TodoItemsContext);

  const addHandler = async () => {
    const todoText = todoTextInput.current.value;
    const todoDate = todoDateInput.current.value;

    // Validate inputs
    if (!todoText || !todoDate) {
      alert("Please enter both todo text and date");
      return;
    }

    todoTextInput.current.value = "";
    todoDateInput.current.value = "";

    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: todoText,
          date: todoDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const serverItem = await response.json();
      const { id, todoText: text, todoDate: date } = todoItemToClientModel(serverItem);
      addTodoItem(id, text, date);
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mb-8">
      <div className="flex flex-wrap gap-4 items-center p-6 bg-white rounded-xl shadow-md">
        <div className="w-full md:flex-1 md:w-auto">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
            placeholder="Enter Todo Here"
            ref={todoTextInput}
          />
        </div>
        <div className="w-full md:w-48">
          <input
            type="date"
            ref={todoDateInput}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
          />
        </div>
        <div className="w-full md:w-32">
          <Button btnType="success" btnText="Add" handler={addHandler} />
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
