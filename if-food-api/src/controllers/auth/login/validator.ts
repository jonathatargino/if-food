import { createValidatorMiddleware } from "@controllers/middlewares/validator";
import { Request } from "express";
import * as yup from "yup";

export const bodySchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export type LoginRequest = Request<{}, {}, yup.InferType<typeof bodySchema>>;

export const loginValidatorMiddleware = createValidatorMiddleware({
    body: bodySchema,
});
