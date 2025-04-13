import { BaseEntity } from "@domain/base-entity";

export interface User extends BaseEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    description?: string;
    phone: string;
    studyCourse: string;
}

export enum UserRole {
    Customer = "customer",
    Seller = "seller",
}
