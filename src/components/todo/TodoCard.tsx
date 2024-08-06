import { useState } from "react";
import { TodoListProps } from "../service/TodoService";

interface TodoProps {
  todo: TodoListProps;
}

const TodoCard = ({ todo }: TodoProps) => {
  const [checked, setChecked] = useState(todo.completed);

  return (
    <div className="border border-gray-600">
      <div className="flex items-center p-2">
        <p className="">{todo.id}.</p>
        <div className="flex-1">{todo.title}</div>
        <input
          className="flex"
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
      <div className="flex justify-around">
        <button className="bg-teal-200 p-2 rounded-md">Update</button>
        <button className="bg-red-500 text-white p-2 rounded-md">Delete</button>
      </div>
    </div>
  );
};

export default TodoCard;
