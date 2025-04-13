import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./contexts/auth/auth-context";
import { SnackbarProvider } from "notistack";

export function App() {
    return (
        <>
            <SnackbarProvider
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom",
                }}
                style={{
                    maxWidth: "552px",
                }}>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </SnackbarProvider>
        </>
    );
}
