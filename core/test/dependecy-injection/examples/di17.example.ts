import { Inject, Service } from '../../../src/dependecy-injection/di.decorators';

@Service()
export class Di17Example {

	@Inject({ variationVarName: 'optionalVariationString', variationIsOptional: true })
	private optionalVariationString?: string;

	constructor(
		@Inject('booleanExample')
		private booleanExample: boolean,
		@Inject({ variationVarName: 'optionalVariationNumber', variationIsOptional: true })
		private optionalVariationNumber?: number
	) {
	}

	public getOptionalVariationString() {
		return this.optionalVariationString;
	}

	public getOptionalVariationNumber() {
		return this.optionalVariationNumber;
	}

	public getBooleanExample() {
		return this.booleanExample;
	}

}
