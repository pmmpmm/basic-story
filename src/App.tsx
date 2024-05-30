import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import queryClient from "@/service/QueryClient";
import ProtectedRoute from "@/pages/ProtectedRoute";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import NewProducts from "@/pages/NewProducts";
import MyCart from "@/pages/MyCart";
import NotFound from "@/pages/NotFound";
import UpdateProduct from "@/pages/UpdateProduct";
// import Signup from "@/pages/Signup";
// import Login from "@/pages/Login";

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
              { path: "/products/:category", element: <Products /> },
              { path: "/products/:category/:id", element: <ProductDetail /> },
              { path: "/products/new", element: <ProtectedRoute requireAdmin element={<NewProducts />} /> },
              { path: "/products/update", element: <ProtectedRoute requireAdmin element={<UpdateProduct />} /> },
              { path: "/cart", element: <ProtectedRoute element={<MyCart />} /> },
              { path: "*", element: <NotFound /> }
            ]
          }
        ])}
      />
    </QueryClientProvider>
  );
};

export default App;
