import { useContext } from "react";
import { TodoItemsContext } from "../store/TodoItemsContext";
import { useEffect } from "react";
import { useState } from "react";
import { todoItemToClientModel } from "../utils/ModelUtil";

const LoadItems = () => {
  const { todoItems, addAllTodoItems } = useContext(TodoItemsContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(import.meta.env);
    console.log(apiUrl);
    fetch(`${apiUrl}/todos`)
      .then((res) => res.json())
      .then((items) => {
        const newItems = items.map(todoItemToClientModel);
        addAllTodoItems(newItems);
        console.log(newItems);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[120px] bg-gray-50 rounded-lg shadow-sm my-4">
      {isLoading && (
        <div className="flex justify-center items-center">
          <div
            className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && todoItems.length === 0 && (
        <p className="text-gray-600 text-xl font-medium tracking-wide">
          Enjoy your day ✨
        </p>
      )}
    </div>
  );
};

export default LoadItems;
