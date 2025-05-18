import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { HomePage } from "./pages/home-page";
import { Products } from "./pages/Products";
import { Layout } from "./components/layout/Layout";

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
        element: <Layout />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "produtos",
                element: <Products />,
            },
            {
                path: "pedidos",
                element: <div>Pedidos Page</div>, // Placeholder
            },
            {
                path: "minha-loja",
                element: <div>Minha Loja Page</div>, // Placeholder
            },
            {
                path: "perfil",
                element: <div>Perfil Page</div>, // Placeholder
            },
        ],
    },
]);
