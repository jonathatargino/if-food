import { UserRepository } from "@domain/user/repository";
import { prisma } from "../client";
import { mapUserToDomain } from "../mapper/user-mapper";

export function makeUserRepository(model = prisma.user): UserRepository {
    return {
        async create(data) {
            const user = await model.create({ data });

            return mapUserToDomain(user);
        },

        async delete(id) {
            await model.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
        },

        async findAll() {
            const users = await model.findMany({ where: { deletedAt: null } });

            return users.map(mapUserToDomain);
        },

        async findByEmail(email) {
            const user = await model.findUnique({ where: { email, deletedAt: null } });

            if (!user) {
                return null;
            }

            return mapUserToDomain(user);
        },

        async update(id, data) {
            const updatedUser = await model.update({
                where: { id },
                data,
            });

            return mapUserToDomain(updatedUser);
        },

        async findById(id) {
            const user = await model.findUnique({ where: { id, deletedAt: null } });

            if (!user) {
                return null;
            }

            return mapUserToDomain(user);
        },
    };
}

export const userRepository = makeUserRepository();
