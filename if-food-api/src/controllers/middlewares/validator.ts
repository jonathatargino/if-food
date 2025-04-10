import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AnySchema, ValidationError } from "yup";

interface RequestValidationSchemas {
    params?: AnySchema;
    body?: AnySchema;
    query?: AnySchema;
}

export function createValidatorMiddleware(schemas: RequestValidationSchemas) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            for (const [key, schema] of Object.entries(schemas)) {
                req[key] = (schema as AnySchema).validateSync(req[key], {
                    stripUnknown: true,
                    abortEarly: false,
                });
            }

            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: error.errors });
                return;
            }

            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    };
}
