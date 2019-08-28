import { ScheduledJobsDocumentationModule } from './documentation.module';

describe('ScheduledJobsDocumentationModule', () => {
	let scheduledJobsDocumentationModule: ScheduledJobsDocumentationModule;

	beforeEach(() => {
		scheduledJobsDocumentationModule = new ScheduledJobsDocumentationModule( );
	});

	it('should create an instance', () => {
		expect(scheduledJobsDocumentationModule).toBeTruthy();
	});
});
