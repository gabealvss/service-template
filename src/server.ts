import { config } from "dotenv";

import HealthCheckController from "@infra/controller/healthcheck.controller";
import KoaServer from "@infra/server/koa";
import { Logger } from "@infra/logger";

const container = async(): Promise<unknown> => {
  await config();
  Logger.init();
  const server = new KoaServer();

  new HealthCheckController(server.getRouter);

  return await server.connect();
}

const app = container();

export { app };
