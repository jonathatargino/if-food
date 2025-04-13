import { buildApp } from "index";
import { serverConfig } from "@config/index";
import { prisma } from "@database/prisma";

async function init() {
    prisma.$connect().then(() => {
        const app = buildApp();
        app.listen(serverConfig.port, "::", () => {
            if (process.env.NODE_ENV !== "production") {
                console.log(`API http server running on port ${serverConfig.port}`);
            }
        });

        app.keepAliveTimeout = serverConfig.keepAliveTimeout;
        app.headersTimeout = serverConfig.headersTimeout;
    });
}

init().catch((e: Error) => {
    console.error(e);
    process.exit(1);
});
