import { Router } from "express";
import { getHealthCheckerRouter } from "./health-checker";

export function getV1Routes() {
    const router = Router();

    router.use("/health", getHealthCheckerRouter());

    return router;
}
