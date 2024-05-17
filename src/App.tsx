import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import queryClient from "@/service/QueryClient";
import Home from "@/pages/Home";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import ShoppingCart from "@/pages/ShoppingCart";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider
        router={createBrowserRouter([
          {
            element: <Outlet />,
            children: [
              { path: "/", element: <Home /> },
              { path: "/signup", element: <Signup /> },
              { path: "/login", element: <Login /> },
              { path: "/products", element: <Products /> },
              { path: "/shopping-cart", element: <ShoppingCart /> }
            ]
          }
        ])}
      />
    </QueryClientProvider>
  );
};

export default App;
