import { createValidatorMiddleware } from "@controllers/middlewares/validator";
import { Request } from "express";
import * as yup from "yup";

export const bodySchema = yup.object().shape({
    token: yup.string().required(),
});

export type VerifyAuthenticationRequest = Request<{}, {}, yup.InferType<typeof bodySchema>>;

export const verifyAuthenticationValidatorMiddleware = createValidatorMiddleware({
    body: bodySchema,
});
