import { findAllUsers as findAllUsersUseCase } from "@useCases/user/find-all";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FindAllUsersRequest } from "./validator";

export async function findAll(req: FindAllUsersRequest, res: Response) {
    try {
        const { name, role, page, itemsPerPage } = req.query;

        const users = await findAllUsersUseCase({
            name: name,
            role: role,
            page: page || 1,
            itemsPerPage: itemsPerPage || 20,
        });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
}
