import { TestClass, Test, BeforeTests } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { DataSourceExample } from './data-source-example';
import { Container } from '../../src/dependecy-injection/di.container';

@TestClass({testThisOnly: true})
export class DatasourceTest extends PlugTest {

	private dataSourceExample: DataSourceExample;

	@BeforeTests()
	public async beforeTest() {
		this.dataSourceExample = await Container.get(DataSourceExample, { [Container.connection]: 'testConnection' });
	}

	@Test()
	public async datasourceExampleCreated() {
		this.assert.ok(this.dataSourceExample);
		this.assert.ok(this.dataSourceExample.getConfiguration());
		this.assert.ok(this.dataSourceExample.getConnection());
		this.assert.deepEqual(this.dataSourceExample.getConfiguration(), {
			'type': 'test-datasource',
			'stringProp': 'some string',
			'numberProp': 123
		});
		this.assert.equal(this.dataSourceExample.getConnection(), 'testConnection');
	}

	@Test()
	public async creationErrores() {
		this.assert.throws(() => new DataSourceExample('test-datasource', <any>{}));
		this.assert.throws(() => new DataSourceExample('', <any>{}));
		this.assert.throws(() => new (<any>DataSourceExample)());
	}

}
