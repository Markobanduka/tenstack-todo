export interface TodoListProps {
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = async (): Promise<TodoListProps[]> => {
  const todosJson = localStorage.getItem("todos");
  const todos: TodoListProps[] = todosJson ? JSON.parse(todosJson) : [];
  return todos;
};

export const addTodo = async (
  newTodo: TodoListProps
): Promise<TodoListProps> => {
  const todosJson = localStorage.getItem("todos");
  const todos: TodoListProps[] = todosJson ? JSON.parse(todosJson) : [];
  const updatedTodos = [...todos, newTodo];
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  return newTodo;
};

export const updateTodo = async (
  updatedTodo: TodoListProps
): Promise<TodoListProps> => {
  const todosJson = localStorage.getItem("todos");
  const todos: TodoListProps[] = todosJson ? JSON.parse(todosJson) : [];
  const updatedTodos = todos.map((todo) =>
    todo.id === updatedTodo.id ? updatedTodo : todo
  );
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  return updatedTodo;
};
