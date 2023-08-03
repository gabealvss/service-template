import { ok } from '@common/http';
import { Router, ServerContext } from '@infra/types/server';
import { IController } from './controller';

export default class HealthCheckController extends IController {
	constructor(router: Router) {
		super(router);

		this.router.get('/healthcheck', this.healthCheck);
	}

	healthCheck(ctx: ServerContext): void {
		ok(ctx, { success: true });
	}
}
