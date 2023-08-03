import Koa from "koa";
import bodyParser from "koa-better-body";
import cors from "kcors";
import helmet from "koa-helmet";
import timeout from "@uswitch/koa-timeout";
import Router from "koa-router";
import rTracer from "cls-rtracer";
import { IServer } from "@infra/types/server";
import { errorHandling } from "@infra/middleware/errorHandling";
import { ILogger } from "@infra/types/logger";
import { Logger } from "@infra/logger";
import { initializeMongoDB } from "@infra/mongodb/connector";

export default class KoaServer implements IServer {
	private server: Koa;
	public router: Router;
  private logger: ILogger;

	constructor() {
    this.logger = Logger.createLogger();
		this.server = new Koa();
		this.server.silent = true;
		this.server
			.use(helmet())
			.use(errorHandling)
			.use(cors())
			.use(timeout(5000, { status: 509 }))
			.use(bodyParser({ strict: false }))
      .use(rTracer.koaMiddleware({ echoHeader: true, useHeader: true, headerName: 'X-Request-Id' }))
      .use(Logger.createRequestLogger());

		this.router = new Router();
	}

	public get getRouter(): Router {
		return this.router;
	}

	public async connect(): Promise<unknown> {
		const PORT = process.env.PORT || 3000;
		try {
      await initializeMongoDB();

			this.logger.info(`Running on Environment: ${process.env.NODE_ENV}`);
			this.server.use(this.router.routes());
			this.server.listen(PORT);
			this.logger.info(`Service running on localhost:${PORT}`);
			return Promise.resolve(this.server);
		} catch (error) {
			this.logger.error(`Failed to start server with Koa at port ${PORT}`, error as Error);
			return Promise.reject(error);
		}
	}
}
