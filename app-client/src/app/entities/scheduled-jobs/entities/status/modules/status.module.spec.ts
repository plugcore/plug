import { ScheduledJobsStatusModule } from './status.module';

describe('ScheduledJobsStatusModule', () => {
	let scheduledJobsStatusModule: ScheduledJobsStatusModule;

	beforeEach(() => {
		scheduledJobsStatusModule = new ScheduledJobsStatusModule( );
	});

	it('should create an instance', () => {
		expect(scheduledJobsStatusModule).toBeTruthy();
	});
});
