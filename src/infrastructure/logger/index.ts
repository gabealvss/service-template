// tslint:disable: no-console
import { ILogger } from "@infra/types/logger";
import { ServerContext, ServerNext } from "@infra/types/server";
import Winston from "winston";
import { consoleFormats, defaultFormats, requestFormatter } from "@infra/logger/formats";
import LoggerInstance from "@infra/logger/instance";

let logger: Winston.Logger;
let isInitialized = false;

const init = () => {
	if (!isInitialized) {
		logger = Winston.createLogger({
			level: 'info',
			format: defaultFormats('Server'),
			transports: [new Winston.transports.Console({ format: consoleFormats(), handleExceptions: true })]
		});

		isInitialized = true;
	}
};

const getWinstonInstance = (): Winston.Logger => {
	return logger;
};

const createLogger = (context?: string): ILogger => {
	if (!context) {
		return new LoggerInstance(logger);
	}

	return new LoggerInstance(logger.child({ label: context }));
};

const createRequestLogger = () => {
	return async function logRequest(ctx: ServerContext, next: ServerNext) {
		await next();
		const [level, message] = requestFormatter(ctx);

		logger.log(level, message);
	};
};

export const Logger = { init, getWinstonInstance, createLogger, createRequestLogger };
