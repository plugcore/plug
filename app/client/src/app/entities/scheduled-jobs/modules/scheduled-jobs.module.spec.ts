import { ScheduledJobsModule } from './scheduled-jobs.module';

describe('ScheduledJobsModule', () => {
	let scheduledJobsModule: ScheduledJobsModule;

	beforeEach(() => {
		scheduledJobsModule = new ScheduledJobsModule( );
	});

	it('should create an instance', () => {
		expect(scheduledJobsModule).toBeTruthy();
	});
});
