import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App/App.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/registration",
      },
      {
        path: "/login",
      },
      {
        path: "/profile",
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);