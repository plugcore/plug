import { TestService, Test, BeforeTests } from '../../src/test/test.decorators';
import { AsserterService } from '../../src/test/test.shared';
import { DataSourceExample } from './data-source-example';
import { Container } from '../../src/dependecy-injection/di.container';
import { DatasourceUtils } from '../../src/data-source/data-source.utils';

@TestService()
export class DatasourceTest extends AsserterService {

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

	@Test()
	public async datasourcesUtils() {
		this.assert.ok(DatasourceUtils.getDatasources().length > 0);
		const testDatasource = DatasourceUtils.getDatasources().find(d => d.type === 'test-datasource');
		this.assert.ok(testDatasource);
		this.assert.deepEqual(testDatasource, { type: 'test-datasource', serviceClass: DataSourceExample });
	}

}
