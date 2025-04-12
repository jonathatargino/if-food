import Cookies from "universal-cookie";

class AuthCookieHandler {
    private readonly cookies: Cookies;

    constructor() {
        this.cookies = new Cookies(document.cookie);
    }

    public getToken() {
        return this.cookies.get("AUTHENTICATION_JWT");
    }

    public setToken(token: string) {
        this.cookies.set("AUTHENTICATION_JWT", token);
    }

    public clearToken() {
        this.cookies.remove("AUTHENTICATION_JWT");
    }
}

export const authCookieHandler = new AuthCookieHandler();
