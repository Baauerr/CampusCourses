import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App/App.tsx";
import Registration from "./components/auth/register/registration.tsx";
import Login from "./components/auth/login/login.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Profile from "./components/auth/profile/profile.tsx";
import { CoursesGroup } from "./components/groups/coursesGroups/coursesGroup.tsx";
import { ConcretteGroup } from "./components/groups/concretteGroup/concretteGroup.tsx";
import { Course } from "./components/course/course.tsx";
import { getTokenFromLocalStorage } from "./helpers/tokenHelper.ts";
import { TypeOfCourses } from "./types/groupsTypes/groupCourses.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/registration/",
        element: <Registration />,
      },
      {
        path: "/login/",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/groups/",
        element: <CoursesGroup />,
      },
      {
        path: "/groups/:id",
        element: <ConcretteGroup typeOfCourses={TypeOfCourses.All} />,
      },
      {
        path: "/courses/my/",
        element: <ConcretteGroup typeOfCourses={TypeOfCourses.My} />,
      },
      {
        path: "/courses/teaching/",
        element: <ConcretteGroup typeOfCourses={TypeOfCourses.Teaching}  />,
      },
      {
        path: "/courses/:id",
        element: <Course />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>


);