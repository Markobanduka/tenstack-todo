import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addTodo } from "../service/TodoService";

const CreateTodo = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const { mutate: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="h-screen w-64 border border-gray-500">
      <div className="flex justify-center items-center">
        <input
          type="text"
          className="border border-gray-700"
          placeholder="Enter todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={() => {
            try {
              addTodoMutation({ title });
              setTitle("");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Add todo
        </button>
      </div>
    </div>
  );
};

export default CreateTodo;
