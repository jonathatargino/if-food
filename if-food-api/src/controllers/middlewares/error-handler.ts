import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
}
