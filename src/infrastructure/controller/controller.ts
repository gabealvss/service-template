import { Router } from '@infra/types/server';

export abstract class IController {
	protected router: Router;
	constructor(router: Router) {
		this.router = router;
	}
}
