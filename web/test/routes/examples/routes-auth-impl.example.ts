import { InjectLogger, Logger, Service } from '@plugcore/core';
import { BasicAuthLogin, CustomAuth, JwtLogin } from '../../../src/routes/routes.decorators';
import { Request } from '../../../src/routes/routes.shared';

@Service()
export class RoutesAuthImplExample {

	constructor(
		@InjectLogger('auth') private log: Logger
	) {}

	@BasicAuthLogin()
	public async basicAuthLogin(user: string, password: string) {
		this.log.info('basicAuthLogin');
		return user === 'testUser' && password === 'testPassword';
	}

	@JwtLogin()
	public async jwtLogin(request: Request) {
		this.log.info('jwtLogin');
		if (request.body && request.body.user === 'testUser') {
			return {
				prop1: 'string1',
				prop2: 2
			};
		}
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
