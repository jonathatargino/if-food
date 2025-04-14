import { getV1Routes } from "@routes/v1";
import express from "express";
import http from "node:http";
import cors from "cors";
import { frontConfig } from "./config";
import "express-async-errors";
import { errorHandler } from "@controllers/middlewares/error-handler";

export function buildApp() {
    const app = express();

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    app.use(
        cors({
            origin: [frontConfig.origin, frontConfig.origin2],
        }),
    );
    app.use("/api/v1", getV1Routes());
    app.use(errorHandler);

    return http.createServer(app);
}
