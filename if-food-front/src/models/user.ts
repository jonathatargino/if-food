export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    description?: string;
    phone: string;
}

export enum UserRole {
    Customer = "customer",
    Seller = "seller",
}
