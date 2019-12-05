
import { Container } from '../../src/dependecy-injection/di.container';
import { DiService } from '../../src/dependecy-injection/di.service';
import { BeforeTests, Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { Di1Example } from './examples/di1.example';
import { Di2Example } from './examples/di2.example';
import { Di3Example } from './examples/di3.example';
import { Di4Example } from './examples/di4.example';
import { Di5Example } from './examples/di5.example';
import { Di6Example } from './examples/di6.example';
import { Di7Example } from './examples/di7.example.ctx';
import { Di8Example } from './examples/di8.example.ctx';
import { Di9Example } from './examples/di9.example.ctx';
import { Di11Example } from './examples/di11.example';
import { Di10Example } from './examples/di10.example';
import { Di12Example } from './examples/di12.example';
import { Di13Example } from './examples/di13.example';
import { Di14Example } from './examples/di14.example';

@TestClass({ testThisOnly: true })
export class DiContainerTest extends PlugTest {

	private example1: Di1Example;
	private example2: Di2Example;
	private example3: Di3Example;
	private example4: Di4Example;
	private example5: Di5Example;
	private example6: Di6Example;
	private example7: Di7Example;
	private example8: Di8Example;
	private example9: Di9Example;
	private example10: Di10Example;
	private example11: Di11Example;
	private example12: Di12Example;
	private example13: Di13Example;
	private example14: Di14Example;

	@BeforeTests()
	public async beforeStart() {

		this.example6 = new Di6Example();
		Container.set(Di6Example, this.example6, 'service6');

		/* const values1 = await Promise.all([
			Container.get<Di1Example>(Di1Example),
			Container.get<Di2Example>(Di2Example),
			Container.get<Di3Example>(Di3Example),
			Container.get<Di4Example>(Di4Example),
			Container.get<Di5Example>(Di5Example),
			Container.get<Di7Example>(Di7Example, 'exampleCtx'),
			Container.get<Di8Example>(Di8Example, 'exampleCtx'),
			Container.get<Di9Example>(Di9Example, 'exampleCtx'),
			Container.get<Di10Example>(Di10Example, undefined, { variationVar: '3' }),
			Container.get<Di11Example>(Di11Example),
		]).catch(e => { return e; }).then(a => a);
 */
		// Too many antries for just 1 Promise.all()
		const values2 = await Promise.all([
			Container.get<Di12Example>(Di12Example),
			Container.get<Di13Example>(Di13Example),
			Container.get<Di14Example>(Di14Example)
		]).catch(e => { return e; }).then(a => a);

		/* this.example1 = values1[0];
		this.example2 = values1[1];
		this.example3 = values1[2];
		this.example4 = values1[3];
		this.example5 = values1[4];
		this.example7 = values1[5];
		this.example8 = values1[6];
		this.example9 = values1[7];
		this.example10 = values1[8];
		this.example11 = values1[9]; */
		this.example12 = values2[1];
		this.example13 = values2[2];
		this.example14 = values2[3];

	}

	@Test()
	public serviceWithInject() {
		this.assert.ok(this.example1.getExample2());
		this.assert.equal(this.example1.timesOnInitCalled, 1);
	}

	@Test()
	public serviceWithIDiOnInit() {
		this.assert.equal(this.example2.timesOnInitCalled, 1);
	}

	@Test()
	public serviceWith2Injects() {
		this.assert.ok(this.example3.getExample1());
		this.assert.ok(this.example3.getExample2());
		this.assert.equal(this.example3.timesOnInitCalled, 1);
	}

	@Test()
	public serviceWithConstructorDependencies() {
		this.assert.equal(this.example4.timesConstructorCalled, 1);
	}

	@Test()
	public serviceWithCustomSId() {
		this.assert.ok(this.example5.getExample1());
		this.assert.ok(this.example5.getExample2());
		this.assert.ok(this.example5.getExample6());
		this.assert.equal(this.example5.timesConstructorCalled, 1);
		this.assert.equal(this.example5.timesOnInitCalled, 1);
	}

	@Test()
	public serviceForCustomCtx() {
		this.assert.equal(this.example7.timesOnInitCalled, 1);
	}

	@Test()
	public serviceForCustomCtxInjectinAnotherServiceFromSameCtx() {
		this.assert.equal(this.example8.timesConstructorCalled, 1);
		this.assert.ok(this.example8.di7Example);
	}

	@Test()
	public serviceForCustomCtxWithReferencesOtherCtxs() {
		this.assert.equal(this.example9.timesConstructorCalled, 1);
		this.assert.ok(this.example9.di1Example);
		this.assert.ok(this.example9.di1Example);
		this.assert.ok(this.example9.di8Example);
		this.assert.ok(!DiService.getMetadata(Di9Example));
		DiService.updateMetadata(Di9Example, { test: 'test' });
		DiService.updateMetadata(Di9Example, { test2: 'test2' }, true);
		this.assert.equal(DiService.getMetadata(Di9Example).test, 'test');
		this.assert.equal(DiService.getMetadata(Di9Example).test2, 'test2');
	}

	@Test()
	public serviceWithVariationVar() {
		this.assert.equal(this.example10.timesConstructorCalled, 1);
		this.assert.ok(this.example10.getExample1());
		this.assert.ok(this.example10.getExample3());
		this.assert.equal(this.example10.getVariationVar(), '3');
	}

	@Test()
	public serviceWithVariation() {
		this.assert.equal(this.example11.timesConstructorCalled, 1);
		this.assert.ok(this.example11.getD10example1());
		this.assert.ok(this.example11.getD10example2());
		this.assert.equal(this.example11.getD10example1().getVariationVar(), '1');
		this.assert.equal(this.example11.getD10example2().getVariationVar(), '2');
		this.assert.ok(this.example11.getD10example1().getExample1());
		this.assert.ok(this.example11.getD10example1().getExample3());
		this.assert.ok(this.example11.getD10example2().getExample1());
		this.assert.ok(this.example11.getD10example2().getExample3());
	}

	@Test({ testThisOnly: true })
	public servicesWithInjectedConnections() {
		this.assert.equal(this.example12.timesConstructorCalled, 1);
		this.assert.equal(this.example13.timesConstructorCalled, 1);
		this.assert.equal(this.example14.timesConstructorCalled, 1);
		this.assert.equal(this.example12.getConnection(), 'testConnection');
		this.assert.ok(this.example12.getDi1Example());
		this.assert.equal(this.example13.getConnection(), 'testConnection');
		this.assert.ok(this.example14.getDi12Example());
		this.assert.ok(this.example14.getDi13Example());
	}

}
