import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, fetchTodos } from "../service/TodoService";
import { useState } from "react";

const TodoCards = () => {
  const queryClient = useQueryClient();
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo = () => {
    mutation.mutate({ id: Date.now(), title: newTodoTitle, completed: false });
    setNewTodoTitle("");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Todo App</h1>
      <div className="mt-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="New Todo"
          className="border p-2 mr-2"
        />
        <button onClick={handleAddTodo} className="bg-blue-500 text-white p-2">
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="border border-t-2">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoCards;
