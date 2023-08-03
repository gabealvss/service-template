export interface ILogger {
	log(level: string, message: string): void;
	info(message: string, ...args: unknown[]): void;
	debug(message: string, ...args: unknown[]): void;
	warning(message: string, ...meta: unknown[]): void;
	error(message: string | Error | unknown, ...args: unknown[]): void;
}
