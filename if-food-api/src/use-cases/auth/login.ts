import { serverConfig } from "@config/index";
import { userRepository } from "@database/prisma/repositories/user";
import { UserRepository } from "@domain/user/repository";
import { UseCaseError } from "@utils/errors";
import { compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";

export function makeLogin(findUserByEmail: UserRepository["findByEmail"]) {
    return async (email: string, password: string) => {
        const user = await findUserByEmail(email);

        if (!user) {
            throw new UseCaseError("Password or email is incorrect", "login", {
                email: email,
                ptBr: "Email ou senha estão incorretos",
            });
        }

        const compare = compareSync(password, user.password);

        if (!compare) {
            throw new UseCaseError("Password or email is incorrect", "login", {
                email: email,
                ptBr: "Email ou senha estão incorretos",
            });
        }

        const tokenPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(tokenPayload, serverConfig.jwtSecret, {
            expiresIn: "15d",
        });

        return {
            user,
            token,
        };
    };
}

export const login = makeLogin(userRepository.findByEmail);
