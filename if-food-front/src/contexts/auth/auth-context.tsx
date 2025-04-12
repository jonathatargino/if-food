import { useState } from "react";
import { User } from "../../models/user";
import { authApi } from "../../services/if-food-api/auth";
import { authCookieHandler } from "../../utils/cookies/auth";
import { AuthContext } from "./context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    async function login(email: string, password: string) {
        const response = await authApi.login(email, password);

        authCookieHandler.setToken(response.token);
        setUser(response.user);
    }

    return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
};
