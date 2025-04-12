import { create, createUserValidatorMiddleware } from "@controllers/user/create";
import { findAll } from "@controllers/user/find-all/controller";

export const UserController = {
    createUserValidatorMiddleware,
    create,
    findAll,
};
