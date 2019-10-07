import { ScheduledJobsDocumentationRoutesModule } from './documentation.routes.module';

describe('ScheduledJobsDocumentationRoutesModule', () => {
	let scheduledJobsDocumentationRoutesModule: ScheduledJobsDocumentationRoutesModule;

	beforeEach(() => {
		scheduledJobsDocumentationRoutesModule = new ScheduledJobsDocumentationRoutesModule();
	});

	it('should create an instance', () => {
		expect(scheduledJobsDocumentationRoutesModule).toBeTruthy();
	});
});
