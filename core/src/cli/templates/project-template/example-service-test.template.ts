
export const exampleServiceTestTemplate = `
import { TestService, AsserterService, Test, BeforeTests, Container, Logger, AfterTests } from "@plugcore/core";
import { ExamlpleServie } from "../../src/example/example.service";
import { Example } from "../../src/example/example.shared";

@TestService()
export class UtilsTestClass extends AsserterService {

	private testId = 'testid';

	constructor(
		private log: Logger,
		private examlpleServie: ExamlpleServie
	) {
		super();
	}

	@BeforeTests()
	public async beforeTests() {
		await this.examlpleServie.remove(this.testId);
		this.log.info('Before tests');
	}

	@AfterTests()
	public async afterTests() {
		this.log.info('After tests');
	}

	@Test()
	public async basicTest() {

		const exampleTest: Example = {
			id: this.testId,
			title: 'testTitle',
			quantity: 1
		};
		await this.examlpleServie.create(exampleTest);

		const exampleTestFromDb = await this.examlpleServie.findById(this.testId);

		this.assert.deepEqual(exampleTest, exampleTestFromDb);

	}

}

`;
