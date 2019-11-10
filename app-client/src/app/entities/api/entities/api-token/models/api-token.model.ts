export interface ApiToken<T = TApiTokenAuth> {
	id?: number;
	name: string;
	credentialsType: 'token' | 'user' | 'jwt';
	credentials: T;
	status?: {
		callsMade: number;
		mbTrasnferd: number;
	};
	quota?: {
		intervalCalls?: 'any' | 'year' | 'month' | 'day' | 'hour' | 'minute';
		intervalMb?: 'any' | 'year' | 'month' | 'day' | 'hour' | 'minute';
		intervalCallsVal?: number;
		intervalMbVal?: number;
		calls?: number;
		mb?: number;
	};
	availableApis?: AvailableApis;
	create_date?: number;
	create_user?: string;
	modify_date?: number;
	modify_user?: string;
}


export interface ITokenAuth {
	token: string;
}
export interface IUserAuth {
	user: string;
	password: string;
}
export interface IJWTAuth {
	payload: Record<string, string | number>;
	payloadToken: string;
}

export type TApiTokenAuth = ITokenAuth | IUserAuth | IJWTAuth;
export type ApiTokenFromDb = Required<ApiToken>;

export class ApiTokenTypeDetector {

	public static isToken(apiToken: ApiToken<TApiTokenAuth>): apiToken is ApiToken<ITokenAuth> {
		return apiToken.credentialsType === 'token';
	}

	public static isUser(apiToken: ApiToken<TApiTokenAuth>): apiToken is ApiToken<IUserAuth> {
		return apiToken.credentialsType === 'user';
	}

	public static isJwt(apiToken: ApiToken<TApiTokenAuth>): apiToken is ApiToken<IJWTAuth> {
		return apiToken.credentialsType === 'jwt';
	}

}

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
