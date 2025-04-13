import { User } from "../../models/user";
import { Api, Method } from "./api";

export interface LoginResponse {
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

    public async verify(token: string): Promise<void> {
        await this.request({
            method: Method.POST,
            urlExtension: "verify",
            payload: { body: { token } },
        });
    }
}

export const authApi = new AuthApi();
