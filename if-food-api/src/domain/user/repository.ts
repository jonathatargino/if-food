import { CreateUserDto } from "./dto";
import { User } from "./entity";

export interface UserRepository {
    create: (data: CreateUserDto) => Promise<User>;
    findByEmail: (email: string) => Promise<User | null>;
    findById: (id: string) => Promise<User | null>;
    findAll: () => Promise<User[]>;
    update: (id: string, data: CreateUserDto) => Promise<User>;
    delete: (id: string) => Promise<void>;
}
