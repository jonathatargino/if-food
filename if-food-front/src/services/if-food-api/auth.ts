import { User } from "../../models/user";
import { authCookieHandler } from "../../utils/cookies/auth";
import { Api, Method } from "./api";

interface LoginResponse {
    user: User;
    token: string;
}

class AuthApi extends Api {
    constructor() {
        super("auth");
    }

    public async login(email: string, password: string): Promise<LoginResponse> {
        const response = await this.request({
            method: Method.POST,
            urlExtension: "login",
            payload: { body: { email, password } },
        });

        return response.data;
    }

    public async verify(): Promise<void> {
        const token = authCookieHandler.getToken();

        await this.request({
            method: Method.POST,
            urlExtension: "verify",
            payload: { headers: { Authorization: token } },
        });
    }
}

export const authApi = new AuthApi();
