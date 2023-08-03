import Winston from "winston";
import rTracer from "cls-rtracer";
import { ServerContext } from "@infra/types/server";
const { format } = Winston;
const { combine, timestamp, printf, colorize, label, metadata } = format;

type LoggerInfo = Winston.Logform.TransformableInfo;
type LoggerFormat = Winston.Logform.Format;

const transformLevelToUpperCase = (): LoggerFormat =>
	format((info: LoggerInfo) => {
		info.level = info.level.toUpperCase();
		return info;
	})();

const rTracerFormat = (): string => {
	const rId = rTracer.id();
	return `${rId ? `[${rId}]` : ''}`;
};

const entryFormat = (): LoggerFormat =>
	printf((info: LoggerInfo) => {
		return `${info.timestamp || new Date().toDateString()} ${rTracerFormat()} ${info.level}: ${info.message}`;
	});

export const defaultFormats = (name?: string): LoggerFormat => {
	return combine(
		transformLevelToUpperCase(),
		label({ label: name || 'Application' }),
		timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
	);
};

export const requestFormatter = (ctx: ServerContext): [string, string] => {
	let logLevel = 'info';

	if (ctx?.status >= 500 || !ctx) {
		logLevel = 'error';
	}

	if (ctx?.status >= 400) {
		logLevel = 'warn';
	}
	const message = ctx ? `[${ctx.method?.toUpperCase()}:${ctx.status}] ${ctx.hostname}${ctx.originalUrl}` : 'No context';

	return [logLevel, message];
};

export const consoleFormats = (): LoggerFormat => {
	return combine(colorize({ all: true }), entryFormat());
};
