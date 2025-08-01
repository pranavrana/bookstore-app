import {
    createBrowserRouter,
  } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/orders",
            element: <div>This is order page</div>
        },
        {
            path: "/about",
            element: <div>This is about page</div>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/cart",
          element: <CartPage/>
        },
        {
          path: '/checkout',
          element: <CheckoutPage/>
        },
        {
          path: '/books/:id',
          element: <SingleBook/>
        }
      ]
    },
  ]);

  export default router;