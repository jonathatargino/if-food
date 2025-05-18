import { createBrowserRouter, Outlet } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { HomePage } from "./pages/home-page";
import { Products } from "./pages/Products";

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
        element: <Outlet />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "produto",
                element: <Products />,
            },
        ],
    },
]);
