import { AuthController } from "@controllers/auth";
import { rateLimitByIp } from "@controllers/middlewares/rate-limiter";
import { Router } from "express";

export function getAuthRouter() {
    const router = Router();

    router.post(
        "/login",
        rateLimitByIp,
        AuthController.loginValidatorMiddleware,
        AuthController.login,
    );
    router.post(
        "/verify",
        AuthController.verifyAuthenticationValidatorMiddleware,
        AuthController.verify,
    );
    return router;
}
