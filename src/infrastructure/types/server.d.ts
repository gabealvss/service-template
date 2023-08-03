import { HttpMethods } from '@common/http';
import { Next, Context } from '@types/koa';
import KoaRouter from 'koa-router';
export type ServerContext = Context;
export type ServerNext = Next;
export type Router = KoaRouter;

export type HandlerFunction = (ctx: ServerContext, next?: ServerNext) => void;
export type ErrorHandlerFunction = (error: Error, ctx: ServerContext, next?: ServerNext) => void;

export type ServerMethod = (
	method: HttpMethods,
	path: string,
	handler: HandlerFunction,
	opts?: Record<string, unknown>
) => IServer;

export interface IServer {
	close?(): Promise<unknown>;
	connect(): Promise<unknown>;
}

declare module 'koa' {
     interface Request {
        files: any;
        fields: any;
    }
}
