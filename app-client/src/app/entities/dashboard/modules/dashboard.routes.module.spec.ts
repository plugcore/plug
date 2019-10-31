import { DashboardRoutesModule } from './dashboard.routes.module';

describe('DashboardRoutesModule', () => {
	let dashboardRoutesModule: DashboardRoutesModule;

	beforeEach(() => {
		dashboardRoutesModule = new DashboardRoutesModule();
	});

	it('should create an instance', () => {
		expect(dashboardRoutesModule).toBeTruthy();
	});
});
