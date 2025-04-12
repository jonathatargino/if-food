import { CreateUserDto } from "./dto";
import { User, UserRole } from "./entity";

export interface FindAllFilters {
    role?: UserRole;
    name?: string;
    page: number;
    itemsPerPage: number;
}

export interface UserRepository {
    create: (data: CreateUserDto) => Promise<User>;
    findByEmail: (email: string) => Promise<User | null>;
    findByPhone: (phone: string) => Promise<User | null>;
    findById: (id: string) => Promise<User | null>;
    findAll: (filters: FindAllFilters) => Promise<User[]>;
    update: (id: string, data: CreateUserDto) => Promise<User>;
    delete: (id: string) => Promise<void>;
}
