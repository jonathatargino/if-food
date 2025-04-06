import { Response, Router } from "express";

export function getHealthCheckerRouter() {
    const router = Router();

    router.get("/", (_, res: Response) => {
        res.send("I'm healthy");
    });

    return router;
}
