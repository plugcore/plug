import { ScheduledJobsStatusRoutesModule } from './status.routes.module';

describe('ScheduledJobsStatusRoutesModule', () => {
	let scheduledJobsStatusRoutesModule: ScheduledJobsStatusRoutesModule;

	beforeEach(() => {
		scheduledJobsStatusRoutesModule = new ScheduledJobsStatusRoutesModule();
	});

	it('should create an instance', () => {
		expect(scheduledJobsStatusRoutesModule).toBeTruthy();
	});
});
