import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoListProps, updateTodo } from "../service/TodoService";

interface TodoItemProps {
  todo: TodoListProps;
  handleDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, handleDelete }) => {
  const queryClient = useQueryClient();
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setEditTodoId(null);
      setEditTodoTitle("");
    },
  });

  const handleUpdate = (id: number) => {
    setEditTodoId(id);
    setEditTodoTitle(todo.title);
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

  return (
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
  );
};

export default TodoItem;
