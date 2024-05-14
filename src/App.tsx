import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import queryClient from "@/service/QueryClient";
import Home from "@/pages/Home";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider
        router={createBrowserRouter([
          {
            element: <Outlet />,
            children: [{ path: "/", element: <Home /> }]
          }
        ])}
      />
    </QueryClientProvider>
  );
};

export default App;
