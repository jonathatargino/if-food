import { verify as verifyUseCase } from "@useCases/auth/verify";
import { VerifyAuthenticationRequest } from "./validator";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function verify(req: VerifyAuthenticationRequest, res: Response) {
    try {
        const { token } = req.body;
        const isAuthenticated = await verifyUseCase(token);

        if (!isAuthenticated) {
            res.status(StatusCodes.UNAUTHORIZED).end();
            return;
        }

        res.status(StatusCodes.OK).end();
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
}
