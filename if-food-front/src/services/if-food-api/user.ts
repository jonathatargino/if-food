import { User } from "../../models/user";
import { Api, Method } from "./api";

class UserApi extends Api {
    constructor() {
        super("users");
    }

    public async create(user: Partial<User>): Promise<User> {
        const response = await this.request({
            method: Method.POST,
            payload: { body: user },
        });

        return response.data;
    }
}

export const userApi = new UserApi();
