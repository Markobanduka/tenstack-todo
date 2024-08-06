import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllTodo from "./components/todo/AllTodo";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AllTodo />
    </QueryClientProvider>
  );
};

export default App;
