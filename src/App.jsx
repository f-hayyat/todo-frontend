import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";
import LoadItems from "./components/LoadItems";
import TodoItems from "./components/TodoItems";
import { TodoItemsProvider } from "./store/TodoItemsContext";

function App() {
  return (
    <TodoItemsProvider>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <center>
          <AppName />
          <AddTodo />
          <LoadItems />
          <TodoItems />
        </center>
      </div>
    </TodoItemsProvider>
  );
}

export default App;
