import { getV1Routes } from "@routes/v1";
import express from "express";
import http from "node:http";
import cors from "cors";

export function buildApp() {
    const app = express();

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    app.use(cors());
    app.use("/api/v1", getV1Routes());

    return http.createServer(app);
}
