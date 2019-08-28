
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

	@BeforeTests()
	public async beforeStart() {

		this.example6 = new Di6Example();
		Container.set(Di6Example, this.example6, 'service6');

		const values = await Promise.all([
			Container.get<Di1Example>(Di1Example),
			Container.get<Di2Example>(Di2Example),
			Container.get<Di3Example>(Di3Example),
			Container.get<Di4Example>(Di4Example),
			Container.get<Di5Example>(Di5Example),
			Container.get<Di7Example>(Di7Example, 'exampleCtx'),
			Container.get<Di8Example>(Di8Example, 'exampleCtx'),
			Container.get<Di9Example>(Di9Example, 'exampleCtx'),
			Container.get<Di10Example>(Di10Example, undefined, { variationVar: '3' }),
			Container.get<Di11Example>(Di11Example)
		]).catch(e => { return e; }).then(a => a);

		this.example1 = values[0];
		this.example2 = values[1];
		this.example3 = values[2];
		this.example4 = values[3];
		this.example5 = values[4];
		this.example7 = values[5];
		this.example8 = values[6];
		this.example9 = values[7];
		this.example10 = values[8];
		this.example11 = values[9];

	}

	@Test()
	public testExample1() {
		this.assert.ok(this.example1.getExample2());
		this.assert.equal(this.example1.timesOnInitCalled, 1);
	}

	@Test()
	public testExample2() {
		this.assert.equal(this.example2.timesOnInitCalled, 1);
	}

	@Test()
	public testExample3() {
		this.assert.ok(this.example3.getExample1());
		this.assert.ok(this.example3.getExample2());
		this.assert.equal(this.example3.timesOnInitCalled, 1);
	}

	@Test()
	public testExample4() {

		this.assert.equal(this.example4.timesConstructorCalled, 1);
	}

	@Test()
	public testExample5() {
		this.assert.ok(this.example5.getExample1());
		this.assert.ok(this.example5.getExample2());
		this.assert.ok(this.example5.getExample6());
		this.assert.equal(this.example5.timesConstructorCalled, 1);
		this.assert.equal(this.example5.timesOnInitCalled, 1);
	}

	@Test()
	public testExample7() {
		this.assert.equal(this.example7.timesOnInitCalled, 1);

	}

	@Test()
	public testExample8() {
		this.assert.equal(this.example8.timesConstructorCalled, 1);
		this.assert.ok(this.example8.di7Example);
	}

	@Test()
	public testExample9() {
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
	public testExample10() {
		this.assert.equal(this.example10.timesConstructorCalled, 1);
		this.assert.ok(this.example10.getExample1());
		this.assert.ok(this.example10.getExample3());
		this.assert.equal(this.example10.getVariationVar(), '3');
	}

	@Test()
	public testExample11() {
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
}
