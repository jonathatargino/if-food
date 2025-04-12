import Cookies from "universal-cookie";
import { User } from "../../models/user";

export interface AuthCookieContent {
    user: User;
    token: string;
}
class AuthCookieHandler {
    private readonly cookies: Cookies;

    constructor() {
        this.cookies = new Cookies(document.cookie);
    }

    public getToken(): AuthCookieContent {
        return this.cookies.get("AUTHENTICATION_JWT") || {};
    }

    public setToken(token: string) {
        this.cookies.set("AUTHENTICATION_JWT", token, {
            path: "/",
            maxAge: 60 * 60 * 24 * 15,
            sameSite: "strict",
            expires: new Date(Date.now() + 60 * 60 * 24 * 15 * 1000),
            secure: true,
        });
    }

    public clearToken() {
        this.cookies.remove("AUTHENTICATION_JWT");
    }
}

export const authCookieHandler = new AuthCookieHandler();
