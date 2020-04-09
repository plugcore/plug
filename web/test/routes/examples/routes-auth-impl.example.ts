import { InjectLogger, Logger, Service, IsString, Required } from '@plugcore/core';
import { BasicAuthLogin, CustomAuth, JwtLogin, JwtPreHandle } from '../../../src/routes/routes.decorators';
import { Request, Response } from '../../../src/routes/routes.shared';

export class JWTLoginReq {
	@Required()
	@IsString()
	public user: string;
}

@Service()
export class RoutesAuthImplExample {

	constructor(
		@InjectLogger('auth') private log: Logger
	) { }

	@BasicAuthLogin()
	public async basicAuthLogin(user: string, password: string) {
		this.log.info('basicAuthLogin');
		return user === 'testUser' && password === 'testPassword';
	}

	@JwtLogin({
		routeSchemas: {
			tags: ['auth'],
			request: JWTLoginReq
		}
	})
	public async jwtLogin(request: Request) {
		this.log.info('jwtLogin');
		if (request.body && request.body.user === 'testUser') {
			return {
				prop1: 'string1',
				prop2: 2
			};
		}
	}

	@JwtPreHandle()
	public async jwtPreHandle(request: Request, response: Response) {
		this.log.info('jwtPreHandle - ' + JSON.stringify(request.jwtPayload) + ' - ' + JSON.stringify(response.context.config));
	}

	@CustomAuth()
	public async customAuth(request: Request) {
		this.log.info('customAuth', request.headers);
		const myHeader = request.headers.myheader;
		const cookiesTest = request.cookies.TESTC;
		if (myHeader === undefined || myHeader === null) {
			throw new Error('My header is missing');
		} else {
			request.customData = { myHeader: `${myHeader}${cookiesTest}` };
		}
	}

}
