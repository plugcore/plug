import { Service, Logger, InjectLogger } from '@plugdata/core';
import { BasicAuthLogin, JwtLogin } from '../../../src/routes/routes.decorators';
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

}
