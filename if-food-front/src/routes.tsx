import { createBrowserRouter, Outlet } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register-page";
import { HomePage } from "./pages/home-page";
import { Guest } from "./components/guest";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/cadastro",
        element: <RegisterPage />,
    },
    {
        path: "/",
        element: (
            <Guest>
                <Outlet />
            </Guest>
        ),
        children: [
            {
                path: "",
                element: <HomePage />,
            },
        ],
    },
]);
