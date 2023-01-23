import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowsePage } from "./pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 20, // 20s
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowsePage />
    </QueryClientProvider>
  );
}

export default App;
