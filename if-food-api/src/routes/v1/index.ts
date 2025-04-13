import { Router } from "express";
import { getHealthCheckerRouter } from "./health-checker";
import { getUserRouter } from "./user";
import { getAuthRouter } from "./auth";

export function getV1Routes() {
    const router = Router();

    router.use("/health", getHealthCheckerRouter());
    router.use("/users", getUserRouter());
    router.use("/auth", getAuthRouter());

    return router;
}
