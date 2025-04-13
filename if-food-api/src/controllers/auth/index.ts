import { login, loginValidatorMiddleware } from "./login";
import { verify, verifyAuthenticationValidatorMiddleware } from "./verify";

export const AuthController = {
    loginValidatorMiddleware,
    login,
    verifyAuthenticationValidatorMiddleware,
    verify,
};
