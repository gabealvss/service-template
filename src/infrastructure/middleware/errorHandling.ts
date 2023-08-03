import { Logger } from '@infra/logger';
import { ServerContext, ServerNext } from '@infra/types/server';

const logger = Logger.createLogger();

export async function errorHandling(ctx: ServerContext, next: ServerNext) {
	try {
		await next();
	} catch (err: any) {
		ctx.status = err.statusCode || err.status || 500;
		ctx.body = {
			message: err.message || 'Unknown internal error.'
		};

		const trace = Object.assign(getError(ctx), ctx.body);
		logger.error(err, JSON.stringify(trace));
	}
}

function getError(ctx: ServerContext): Record<string, string> {
	const method = ctx.req.method || 'GET';
	const path = ctx.req.url || '';
	return { method, path };
}
