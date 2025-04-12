import { useAuth } from "../contexts/auth";
import { Navigate } from "react-router-dom";

export function Guest({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();

    console.log(isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}
