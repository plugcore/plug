import { Inject, Service } from '../../../src/dependecy-injection/di.decorators';

@Service()
export class Di17Example {

	@Inject({ variationVarName: 'optionalVariationString' })
	private optionalVariationString?: string;

	constructor(
		@Inject('booleanExample')
		private booleanExample: boolean,
		@Inject({ variationVarName: 'optionalVariationNumber' })
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
