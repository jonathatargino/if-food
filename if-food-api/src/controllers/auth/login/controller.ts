import { login as loginUseCase } from "@useCases/auth/login";
import { UseCaseError } from "@utils/errors";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { LoginRequest } from "./validator";

export async function login(req: LoginRequest, res: Response) {
    try {
        const { email, password } = req.body;
        const user = await loginUseCase(email, password);

        res.status(200).json(user);
    } catch (error) {
        if (error instanceof UseCaseError) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: {
                    ptBr: error.metadata.ptBr,
                    en: error.message,
                },
            });
            return;
        }

        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
}
