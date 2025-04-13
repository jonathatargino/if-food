import { userRepository } from "@database/prisma/repositories/user";
import { CreateUserDto } from "@domain/user/dto";
import { UserRepository } from "@domain/user/repository";
import { hashSync } from "bcrypt";
import { UseCaseError } from "@utils/errors";
import { ErrorCodesEnum } from "@utils/errors/codes";

export function makeCreateUser(
    create: UserRepository["create"],
    findByEmail: UserRepository["findByEmail"],
    findByPhone: UserRepository["findByPhone"],
) {
    return async (userData: CreateUserDto) => {
        const [userUsingEmail, userUsingPhone] = await Promise.all([
            findByEmail(userData.email),
            findByPhone(userData.phone),
        ]);

        if (userUsingEmail) {
            throw new UseCaseError("This email is already in use", "create-user", {
                email: userData.email,
                ptBr: "Esse email já está em uso",
                code: ErrorCodesEnum.EmailAlreadyBeingUsed,
            });
        }

        if (userUsingPhone) {
            throw new UseCaseError("This phone is already in use", "create-user", {
                phone: userData.phone,
                ptBr: "Esse telefone já está em uso",
                code: ErrorCodesEnum.PhoneAlreadyBeingUser,
            });
        }

        const hashedPassword = hashSync(userData.password, 10);

        const user = await create({
            ...userData,
            password: hashedPassword,
        });

        return {
            ...user,
            password: undefined,
        };
    };
}

export const createUser = makeCreateUser(
    userRepository.create,
    userRepository.findByEmail,
    userRepository.findByPhone,
);
