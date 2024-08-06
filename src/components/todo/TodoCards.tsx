import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, fetchTodos, TodoListProps } from "../service/TodoService";
import { useState } from "react";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";

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

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo = () => {
    addMutation.mutate({
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
    });
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
            <TodoItem key={todo.id} todo={todo} handleDelete={handleDelete} />
          ))
        ) : (
          <li>No todos available</li>
        )}
      </ul>
    </div>
  );
};

export default TodoCards;
