import { ServerContext } from '@infra/types/server';

export enum HttpStatus {
	Success = 200,
	Created = 201,
	ValidationError = 400,
	AuthorizationError = 401,
	ForbiddenError = 403,
	NotFoundError = 404,
	SystemError = 500
}

export enum HttpMethods {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete'
}

export function ok(ctx: ServerContext, data: unknown) {
	ctx.response.status = HttpStatus.Success;
	ctx.response.body = data;
}

export function created(ctx: ServerContext, data: unknown) {
	ctx.response.status = HttpStatus.Created;
	ctx.response.body = data;
}

export function serverError(ctx: ServerContext) {
	ctx.response.status = HttpStatus.SystemError;
}

export function forbidden(ctx: ServerContext, data?: Record<string, unknown>) {
	ctx.response.status = HttpStatus.ForbiddenError;
	if (data) {
		ctx.response.body = data;
		return;
	}

	ctx.response.body = {
		message: 'Access denied.'
	};
}

export function unauthorized(ctx: ServerContext, data?: Record<string, unknown>) {
	ctx.response.status = HttpStatus.AuthorizationError;
	if (data) {
		ctx.response.body = data;
		return;
	}

	ctx.response.body = {
		message: 'Unauthorized'
	};
}

export function badRequest(ctx: ServerContext, err: Error) {
	ctx.response.status = HttpStatus.ValidationError;
	ctx.response.body = {
		message: err.message
	};
}
