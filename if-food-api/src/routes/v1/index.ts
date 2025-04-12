import { Router } from "express";
import { getHealthCheckerRouter } from "./health-checker";
import { getUserRouter } from "./user";

export function getV1Routes() {
    const router = Router();

    router.use("/health", getHealthCheckerRouter());
    router.use("/users", getUserRouter());

    return router;
}
