import Login from "./pages/Login";
import Product from "./pages/Product"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import DeleteProduct from "./pages/DeleteProduct";
import ViewProduct from "./pages/ViewProduct";
import UpdateProduct from "./pages/UpdateProduct";

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoutes><Dashboard /></ProtectedRoutes>,
  },
  {
    path: '/product',
    element: <ProtectedRoutes><Product /></ProtectedRoutes>,
  },
  {
    path: '/order',
    element: <ProtectedRoutes><Product /></ProtectedRoutes>,
  },
  {
    path: '/transaction',
    element: <ProtectedRoutes><Product /></ProtectedRoutes>,
  },
  {
    path: '/setting',
    element: <ProtectedRoutes><Product /></ProtectedRoutes>,
  },
  // {
  //   path: '/product/delete/:id',
  //   element: <ProtectedRoutes><DeleteProduct /></ProtectedRoutes>,
  // },
  {
    path: '/product/:id',
    element: <ProtectedRoutes><ViewProduct /></ProtectedRoutes>,
  },
  // {
  //   path: '/product/edit/:id',
  //   element: <ProtectedRoutes><UpdateProduct /></ProtectedRoutes>,
  // }

])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App;
