import { SystemLogModule } from './log.module';

describe('SystemLogModule', () => {
	let systemLogModule: SystemLogModule;

	beforeEach(() => {
		systemLogModule = new SystemLogModule( );
	});

	it('should create an instance', () => {
		expect(systemLogModule).toBeTruthy();
	});
});
