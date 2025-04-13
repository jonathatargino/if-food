import { createValidatorMiddleware } from "@controllers/middlewares/validator";
import { UserRole } from "@domain/user";
import { Request } from "express";
import * as yup from "yup";

export const querySchema = yup.object().shape({
    name: yup.string().optional(),
    role: yup.string().oneOf(Object.values(UserRole)).optional(),
    page: yup.number().optional(),
    itemsPerPage: yup.number().optional(),
});

export type FindAllUsersRequest = Request<{}, {}, {}, yup.InferType<typeof querySchema>>;

export const findAllUsersValidatorMiddleware = createValidatorMiddleware({
    query: querySchema,
});
