import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import queryClient from "@/service/QueryClient";
import Home from "@/pages/Home";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import NewProducts from "@/pages/NewProducts";
import MyCart from "@/pages/MyCart";
import NotFound from "@/pages/NotFound";

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
              { path: "/products/:category", element: <Products /> },
              { path: "/products/:category/:id", element: <ProductDetail /> },
              { path: "/products/new", element: <NewProducts /> },
              { path: "/cart", element: <MyCart /> },
              { path: "*", element: <NotFound /> }
            ]
          }
        ])}
      />
    </QueryClientProvider>
  );
};

export default App;
