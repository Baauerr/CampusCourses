import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App/App.tsx";
import Registration from "./components/auth/register/registration.tsx";
import Login from "./components/auth/login/login.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Profile from "./components/auth/profile/profile.tsx";
import GroupsCoursesPage from "./components/groupsCourses/groupsCourses.tsx";
import MyCoursesPage from "./components/studentCourses/myCourses.tsx";
import TeachingCoursesPage from "./components/teacherCourses/teacherCourses.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/groups",
        element: <GroupsCoursesPage/>,
      },
      {
        path: "/courses/my",
        element: <MyCoursesPage />,
      },
      {
        path: "/courses/teaching",
        element: <TeachingCoursesPage />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store = {store}>
    <RouterProvider router={router} />
  </Provider>


);