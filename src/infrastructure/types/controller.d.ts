export interface DefaultResponse {
	message?: string;
	data?: unknown;
}

export interface IController {
	routes(): RouteMapper[];
}
