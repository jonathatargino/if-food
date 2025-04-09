import { UserRole } from "./entity";

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    description?: string;
}
