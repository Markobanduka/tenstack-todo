import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTodo,
  fetchTodos,
  updateTodo,
  TodoListProps,
} from "../service/TodoService";
import { useState } from "react";
import CreateTodo from "./CreateTodo";

const TodoCards: React.FC = () => {
  const queryClient = useQueryClient();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");

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

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setEditTodoId(null);
      setEditTodoTitle("");
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

  const handleUpdate = (id: number) => {
    const todoToUpdate = todos?.find((todo) => todo.id === id);
    if (todoToUpdate) {
      setEditTodoId(id);
      setEditTodoTitle(todoToUpdate.title);
    }
  };

  const handleSaveUpdate = () => {
    if (editTodoId !== null) {
      updateMutation.mutate({
        id: editTodoId,
        title: editTodoTitle,
        completed: false,
      });
    }
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
              {editTodoId === todo.id ? (
                <input
                  type="text"
                  value={editTodoTitle}
                  onChange={(e) => setEditTodoTitle(e.target.value)}
                  className="border"
                />
              ) : (
                <span>{todo.title}</span>
              )}
              <div>
                {editTodoId === todo.id ? (
                  <div>
                    <button
                      className="bg-green-600 p-1 text-white mx-1"
                      onClick={handleSaveUpdate}
                    >
                      Save
                    </button>
                    <button
                      className=" px-3 py-1 bg-red-500 text-white"
                      onClick={() => setEditTodoId(null)}
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="bg-blue-600 p-1 text-white mx-1"
                      onClick={() => handleUpdate(todo.id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white p-1"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
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
