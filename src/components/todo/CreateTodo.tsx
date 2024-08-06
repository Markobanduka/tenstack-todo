interface CreateTodoProps {
  handleAddTodo: () => void;
  newTodoTitle: string;
  setNewTodoTitle: (title: string) => void;
}

const CreateTodo: React.FC<CreateTodoProps> = ({
  handleAddTodo,
  newTodoTitle,
  setNewTodoTitle,
}) => {
  return (
    <div>
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
    </div>
  );
};

export default CreateTodo;
