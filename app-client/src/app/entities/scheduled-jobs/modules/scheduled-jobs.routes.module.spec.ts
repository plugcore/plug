import { ScheduledJobsRoutesModule } from './scheduled-jobs.routes.module';

describe('ScheduledJobsRoutesModule', () => {
	let scheduledJobsRoutesModule: ScheduledJobsRoutesModule;

	beforeEach(() => {
		scheduledJobsRoutesModule = new ScheduledJobsRoutesModule();
	});

	it('should create an instance', () => {
		expect(scheduledJobsRoutesModule).toBeTruthy();
	});
});
