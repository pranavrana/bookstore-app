import {
    createBrowserRouter,
  } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
  
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
        }
      ]
    },
  ]);

  export default router;