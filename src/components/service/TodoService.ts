export interface TodoListProps {
  id: number;
  title: string;
  completed: boolean;
  comments: string[];
}

export const addTodo = async (newTodo) => {
  // Simulate adding to local storage or some local data
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = [...todos, newTodo];
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  return newTodo;
};

export const fetchTodos = async () => {
  // Simulate fetching from local storage or some local data
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
};
