import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemLogsDetailsComponent } from './details.component';

describe('SystemLogsDetailsComponent', () => {
	let component: SystemLogsDetailsComponent;
	let fixture: ComponentFixture<SystemLogsDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SystemLogsDetailsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SystemLogsDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
