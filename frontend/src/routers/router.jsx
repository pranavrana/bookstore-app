import {
    createBrowserRouter,
  } from "react-router";
import App from "../App";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <h1>Home</h1>
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