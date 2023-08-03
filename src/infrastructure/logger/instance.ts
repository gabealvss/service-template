import { ILogger } from "@infra/types/logger";
import Winston from "winston";

export default class LoggerInstance implements ILogger {
	constructor(private readonly logger: Winston.Logger) {}

	public log(level: string, message: string): void {
		this.logger.log({ level, message });
	}

	public info(message: string, ...meta: unknown[]): void {
		this.logger.info(message, meta);
	}

	public warning(message: string, ...meta: unknown[]): void {
		this.logger.warning(message, meta);
	}

	public error(message: string | Error | Record<string, unknown>, ...meta: unknown[]): void { 
		const [msg, extraMeta] = this.getErrorMessage(message);
		this.logger.error(msg, meta, extraMeta);
	}

	private getErrorMessage(value: string | Record<string, unknown> | Error): [string, unknown] {
		const msg = 'Error without message';

		if (typeof value === 'string') {
			return [value, null];
		}

		if (typeof value === 'object') {
			return [JSON.stringify(value), value];
		}

		return [msg, value];
	}

	public debug(message: string, ...meta: unknown[]): void {
		this.logger.debug(message, meta);
	}
}
