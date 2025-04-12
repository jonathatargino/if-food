import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/login-page";
import { RegisterPage } from "./pages/register-page";
import { HomePage } from "./pages/home-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);
