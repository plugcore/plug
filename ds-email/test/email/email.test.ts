import { AsserterService, Test, TestService } from '@plugcore/core';
import { EmailDataSource } from '../../src/email/email.datasource';

@TestService({ connection: 'testemail' })
export class MongoDbConnectionTest extends AsserterService {

	constructor(
		private emailDataSource: EmailDataSource
	) {
		super();
	}

	@Test()
	public async connectionTest() {
		this.assert.ok(this.emailDataSource);
	}

}
