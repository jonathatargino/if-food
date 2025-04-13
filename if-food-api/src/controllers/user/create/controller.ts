import { createUser as createUserUseCase } from "@useCases/user/create";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateUserRequest } from "./validator";
import { UseCaseError } from "@utils/errors";

export async function create(req: CreateUserRequest, res: Response) {
    try {
        const user = await createUserUseCase(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof UseCaseError) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: {
                    ptBr: error.metadata.ptBr,
                    en: error.message,
                },
                code: error.metadata.code,
            });
            return;
        }

        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
}
