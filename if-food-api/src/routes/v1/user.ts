import { UserController } from "@controllers/user";
import { Router } from "express";

export function getUserRouter() {
    const router = Router();

    router.get("/", UserController.findAll);
    router.post("/", UserController.createUserValidatorMiddleware, UserController.create);

    return router;
}
