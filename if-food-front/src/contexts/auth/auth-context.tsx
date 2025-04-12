import { useEffect, useState } from "react";
import { User } from "../../models/user";
import { authApi } from "../../services/if-food-api/auth";
import { authCookieHandler } from "../../utils/cookies/auth";
import { AuthContext } from "./context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { user: tokenUser, token } = authCookieHandler.getToken();
    const [user, setUser] = useState<User | null>(tokenUser);

    const isAuthenticated = !!user;

    async function login(email: string, password: string) {
        const response = await authApi.login(email, password);

        authCookieHandler.setToken(JSON.stringify(response));
        setUser(response.user);
    }

    async function verifyUserAuthentication() {
        try {
            await authApi.verify(token);
        } catch {
            authCookieHandler.clearToken();
            setUser(null);
        }
    }

    useEffect(() => {
        verifyUserAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
