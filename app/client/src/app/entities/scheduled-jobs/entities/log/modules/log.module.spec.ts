import { ScheduledJobsLogModule } from './log.module';

describe('ScheduledJobsLogModule', () => {
	let scheduledJobsLogModule: ScheduledJobsLogModule;

	beforeEach(() => {
		scheduledJobsLogModule = new ScheduledJobsLogModule( );
	});

	it('should create an instance', () => {
		expect(scheduledJobsLogModule).toBeTruthy();
	});
});
