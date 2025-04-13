import { User as DomainUser } from "@domain/user";
import { User as PrismaUser } from "@prisma/client";

export function mapUserToDomain(user: PrismaUser): DomainUser {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt || undefined,
        password: user.password,
        role: user.role as DomainUser["role"],
        description: user.description || undefined,
        phone: user.phone,
        studyCourse: user.studyCourse,
    };
}
