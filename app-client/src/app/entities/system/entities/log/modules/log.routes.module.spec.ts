import { SystemLogRoutesModule } from './log.routes.module';

describe('SystemLogRoutesModule', () => {
	let systemLogRoutesModule: SystemLogRoutesModule;

	beforeEach(() => {
		systemLogRoutesModule = new SystemLogRoutesModule();
	});

	it('should create an instance', () => {
		expect(systemLogRoutesModule).toBeTruthy();
	});
});
