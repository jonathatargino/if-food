import { createContext } from "react";
import { User } from "../../models/user";

interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData | null>(null);
