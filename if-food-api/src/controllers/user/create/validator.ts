import { createValidatorMiddleware } from "@controllers/middlewares/validator";
import { UserRole } from "@domain/user";
import { Request } from "express";
import * as yup from "yup";

export const bodySchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup.string().oneOf(Object.values(UserRole)).required(),
    description: yup.string().optional(),
    phone: yup.string().required(),
});

export type CreateUserRequest = Request<{}, {}, yup.InferType<typeof bodySchema>>;

export const createUserValidatorMiddleware = createValidatorMiddleware({
    body: bodySchema,
});
