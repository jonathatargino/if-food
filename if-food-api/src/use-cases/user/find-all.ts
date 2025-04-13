import { userRepository } from "@database/prisma/repositories/user";
import { UserRepository, FindAllFilters } from "@domain/user/repository";

export function makeFindAllUsers(findAll: UserRepository["findAll"]) {
    return async (filters: FindAllFilters) => {
        const users = await findAll(filters);
        return users;
    };
}

export const findAllUsers = makeFindAllUsers(userRepository.findAll);
