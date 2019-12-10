import { Container } from '../../src/dependecy-injection/di.container';
import { DiService } from '../../src/dependecy-injection/di.service';
import { BeforeTests, Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { Di1Example } from './examples/di1.example';
import { Di10Example } from './examples/di10.example';
import { Di11Example } from './examples/di11.example';
import { Di12Example } from './examples/di12.example';
import { Di13Example } from './examples/di13.example';
import { Di14Example } from './examples/di14.example';
import { Di15Example } from './examples/di15.example';
import { Di16Example } from './examples/di16.example';
import { Di17Example } from './examples/di17.example';
import { Di18Example } from './examples/di18.example';
import { Di19Example } from './examples/di19.example';
import { Di2Example } from './examples/di2.example';
import { Di3Example } from './examples/di3.example';
import { Di4Example } from './examples/di4.example';
import { Di5Example } from './examples/di5.example';
import { Di6Example } from './examples/di6.example';
import { Di7Example } from './examples/di7.example.ctx';
import { Di8Example } from './examples/di8.example.ctx';
import { Di9Example } from './examples/di9.example.ctx';
import { Di20Example } from './examples/di20.example';
import { Di21Example } from './examples/di21.example';
import { Di22Example } from './examples/di22.example';

@TestClass()
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
	private example15: Di15Example;
	private example16: Di16Example;
	private example17: Di17Example;
	private example18: Di18Example;
	private example19: Di19Example;
	private example20: Di20Example;
	private example21: Di21Example;
	private example22: Di22Example;

	@BeforeTests()
	public async beforeStart() {

		this.example6 = new Di6Example();
		Container.set(Di6Example, this.example6, 'service6');

		// Primitive dependencies
		Container.set(String, 'stringExample', 'stringExample');
		Container.set(Number, 123, 'numberExample');
		Container.set(Boolean, true, 'booleanExample');

		const values1 = await Promise.all([
			Container.get(Di1Example),
			Container.get(Di2Example),
			Container.get(Di3Example),
			Container.get(Di4Example),
			Container.get(Di5Example),
			Container.get(Di7Example, undefined, 'exampleCtx'),
			Container.getFromContext(Di8Example, 'exampleCtx'),
			Container.getFromContext(Di9Example, 'exampleCtx'),
			Container.get(Di10Example, { variationVar: '3' }),
			Container.get(Di11Example),
		]);

		// Too many antries for just 1 Promise.all()
		const values2 = await Promise.all([
			Container.get(Di12Example, { connection: 'testConnection' }),
			Container.get(Di13Example, { connection: 'testConnection' }),
			Container.get(Di14Example),
			Container.get(Di15Example),
			Container.get(Di16Example),
			Container.get(Di17Example),
			Container.get(Di18Example),
			Container.get(Di19Example)
		]);

		// Too many antries for just 1 Promise.all()
		const values3 = await Promise.all([
			Container.get(Di20Example),
			Container.get(Di21Example),
			Container.get(Di22Example)
		]);

		this.example1 = values1[0];
		this.example2 = values1[1];
		this.example3 = values1[2];
		this.example4 = values1[3];
		this.example5 = values1[4];
		this.example7 = values1[5];
		this.example8 = values1[6];
		this.example9 = values1[7];
		this.example10 = values1[8];
		this.example11 = values1[9];
		this.example12 = values2[0];
		this.example13 = values2[1];
		this.example14 = values2[2];
		this.example15 = values2[3];
		this.example16 = values2[4];
		this.example17 = values2[5];
		this.example18 = values2[6];
		this.example19 = values2[7];
		this.example20 = values3[0];
		this.example21 = values3[1];
		this.example22 = values3[2];

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

	@Test()
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

	@Test()
	public servicesWithOptionalConnections() {
		// Without value
		this.assert.equal(this.example18.getDi15Example().getConnection(), undefined);
		this.assert.equal(this.example18.getDi16Example().getConnection(), undefined);
		// With value
		this.assert.equal(this.example19.getDi15Example().getConnection(), 'testConnection');
		this.assert.equal(this.example19.getDi16Example().getConnection(), 'testConnection');
	}

	@Test()
	public servicesWithOptionalVariations() {
		// Without value
		this.assert.equal(this.example18.getDi17Example().getOptionalVariationNumber(), undefined);
		this.assert.equal(this.example18.getDi17Example().getOptionalVariationString(), undefined);
		// With value
		this.assert.equal(this.example19.getDi17Example1().getOptionalVariationNumber(), 11);
		this.assert.equal(this.example19.getDi17Example1().getOptionalVariationString(), 'stringtest1');
		this.assert.equal(this.example19.getDi17Example2().getOptionalVariationNumber(), 22);
		this.assert.equal(this.example19.getDi17Example2().getOptionalVariationString(), 'stringtest2');
	}

	@Test()
	public servicesWithPartialOptionalVariations() {
		this.assert.equal(this.example19.getDi17Example3().getOptionalVariationNumber(), undefined);
		this.assert.equal(this.example19.getDi17Example3().getOptionalVariationString(), 'stringtest3');
		this.assert.equal(this.example19.getDi17Example4().getOptionalVariationNumber(), 44);
		this.assert.equal(this.example19.getDi17Example4().getOptionalVariationString(), undefined);
	}

	@Test()
	public servicesWithPrimitiveTypeDependencies() {
		this.assert.equal(this.example15.getStringExample(), 'stringExample');
		this.assert.equal(this.example18.getDi15Example().getStringExample(), 'stringExample');
		this.assert.equal(this.example19.getDi15Example().getStringExample(), 'stringExample');
		this.assert.equal(this.example16.getNumberExample(), 123);
		this.assert.equal(this.example18.getDi16Example().getNumberExample(), 123);
		this.assert.equal(this.example19.getDi16Example().getNumberExample(), 123);
		this.assert.equal(this.example17.getBooleanExample(), true);
		this.assert.equal(this.example18.getDi17Example().getBooleanExample(), true);
		this.assert.equal(this.example19.getDi17Example1().getBooleanExample(), true);
		this.assert.equal(this.example19.getDi17Example2().getBooleanExample(), true);
		this.assert.equal(this.example19.getDi17Example3().getBooleanExample(), true);
		this.assert.equal(this.example19.getDi17Example4().getBooleanExample(), true);
	}

	@Test()
	public mixBetweenConnectionAndOptionalVariationVars() {

		this.assert.equal(this.example20.getVarProp(), undefined);
		this.assert.equal(this.example20.getVarConstructor(), undefined);
		this.assert.equal(this.example20.getVarConstructorConnection(), undefined);

		this.assert.equal(this.example21.getDi20Example1().getVarProp(), 'varProp');
		this.assert.equal(this.example21.getDi20Example1().getVarConstructor(), 'varConstructor');
		this.assert.equal(this.example21.getDi20Example1().getVarConstructorConnection(), 'testConnection');

		this.assert.equal(this.example21.getDi20Example2().getVarProp(), undefined);
		this.assert.equal(this.example21.getDi20Example2().getVarConstructor(), 'varConstructor');
		this.assert.equal(this.example21.getDi20Example2().getVarConstructorConnection(), 'testConnection');

		this.assert.equal(this.example21.getDi20Example3().getVarProp(), 'varProp');
		this.assert.equal(this.example21.getDi20Example3().getVarConstructor(), undefined);
		this.assert.equal(this.example21.getDi20Example3().getVarConstructorConnection(), 'testConnection');

		this.assert.equal(this.example21.getDi20Example4().getVarProp(), undefined);
		this.assert.equal(this.example21.getDi20Example4().getVarConstructor(), undefined);
		this.assert.equal(this.example21.getDi20Example4().getVarConstructorConnection(), 'testConnection');

		this.assert.equal(this.example22.getDi20Example1().getVarProp(), 'varProp');
		this.assert.equal(this.example22.getDi20Example1().getVarConstructor(), 'varConstructor');
		this.assert.equal(this.example22.getDi20Example1().getVarConstructorConnection(), undefined);

		this.assert.equal(this.example22.getDi20Example2().getVarProp(), undefined);
		this.assert.equal(this.example22.getDi20Example2().getVarConstructor(), 'varConstructor');
		this.assert.equal(this.example22.getDi20Example2().getVarConstructorConnection(), undefined);

		this.assert.equal(this.example22.getDi20Example3().getVarProp(), 'varProp');
		this.assert.equal(this.example22.getDi20Example3().getVarConstructor(), undefined);
		this.assert.equal(this.example22.getDi20Example3().getVarConstructorConnection(), undefined);

		this.assert.equal(this.example22.getDi20Example4().getVarProp(), undefined);
		this.assert.equal(this.example22.getDi20Example4().getVarConstructor(), undefined);
		this.assert.equal(this.example22.getDi20Example4().getVarConstructorConnection(), undefined);

	}

}
