import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { PrivateRoutes } from "../App/PrivateRoutes";
import Profile from "../components/auth/profile/profile";
import { CoursesGroup } from "../components/groups/coursesGroups/coursesGroup";
import { ConcretteGroup } from "../components/groups/concretteGroup/concretteGroup";
import { TypeOfCourses } from "../types/groupsTypes/groupCourses";
import { Course } from "../components/course/course";
import { MainComponent } from "../App/MainComponent";
import Registration from "../components/auth/register/registration";
import Login from "../components/auth/login/login";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { HelloComponent } from "../App/HelloPage";

export const router = createBrowserRouter([
    {
        element: <PrivateRoutes />,
        children: [
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
                element: <ConcretteGroup typeOfCourses={TypeOfCourses.Teaching} />,
            },
            {
                path: "/courses/:id",
                element: <Course />,
            },
        ]
    },
    {
        element: <MainComponent />,
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
                path: "/",
                element: <HelloComponent />,
            },
        ]
    },

]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);