import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, fetchTodos, TodoListProps } from "../service/TodoService";
import { useState } from "react";
import CreateTodo from "./CreateTodo";

const TodoCards: React.FC = () => {
  const queryClient = useQueryClient();
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<TodoListProps[]>({
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

  const handleDelete = (id: number) => {
    const filteredTodos = todos?.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <CreateTodo
        handleAddTodo={handleAddTodo}
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
      />
      <ul>
        {todos?.length ? (
          todos.map((todo: TodoListProps) => (
            <li
              key={todo.id}
              className="border border-t-2 flex justify-between items-center p-2"
            >
              <span>{todo.title}</span>
              <div>
                <button className="bg-blue-600 p-1 text-white mx-1">
                  Update
                </button>
                <button
                  className="bg-red-500 text-white p-1"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No todos available</li>
        )}
      </ul>
    </div>
  );
};
export default TodoCards;
