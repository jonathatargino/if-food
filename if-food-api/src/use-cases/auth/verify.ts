import { serverConfig } from "@config/index";
import * as jwt from "jsonwebtoken";

export function makeVerify() {
    return async (token: string) => {
        try {
            jwt.verify(token, serverConfig.jwtSecret);
            return true;
        } catch {
            return false;
        }
    };
}

export const verify = makeVerify();
