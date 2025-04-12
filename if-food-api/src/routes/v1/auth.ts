import { AuthController } from "@controllers/auth";
import { Router } from "express";

export function getAuthRouter() {
    const router = Router();

    router.post("/login", AuthController.loginValidatorMiddleware, AuthController.login);

    return router;
}
