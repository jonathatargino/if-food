import { parseIntegerEnviromentVariable, parseStringEnviromentVariable } from "./utils";

interface ServerConfig {
    port: number;
    env: string;
    keepAliveTimeout: number;
    headersTimeout: number;
}

export const serverConfig: ServerConfig = {
    port: parseIntegerEnviromentVariable("SERVER_PORT", 3009),
    env: parseStringEnviromentVariable("NODE_ENV", "development"),
    keepAliveTimeout: parseIntegerEnviromentVariable("SERVER_KEEP_ALIVE_TIMEOUT", 61 * 1000),
    headersTimeout: parseIntegerEnviromentVariable("SERVER_HEADERS_TIMEOUT", 62 * 1000),
};
