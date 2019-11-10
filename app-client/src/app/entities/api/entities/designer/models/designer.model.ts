export interface IApiInfo {
	id?: number;
	method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
	uri: string;
	description: string;
	tags?: string[];
	documentation?: {
		request?: any,
		response?: any,
		parameters?: any,
		urlparameters?: any,
		headers?: any
	};
}

export interface IApiProxy extends IApiInfo {
	targetUrl: string;
	retries?: number;
	timeout?: number;
}

export interface IApiInternal extends IApiInfo {
	jsClass: string;
	jsMethod: string;
}

export type ApiFromDb = IApiProxy | IApiInternal;

export interface AvailableApis {
	tours: {
		findToursInCity: boolean;
		findRelatedProductsForTour: boolean;
	};
	reservations: {
		createReservation: boolean;
		findUserReservations: boolean;
		cancelReservation: boolean;
	};
}


export class ApiTypeDetector {

	public static isApiInternal(arg: ApiFromDb): arg is IApiInternal {
		return (<IApiInternal>arg).jsMethod !== undefined;
	}

	public static isApiProxy(arg: ApiFromDb): arg is IApiProxy {
		return (<IApiProxy>arg).targetUrl !== undefined;
	}

}
