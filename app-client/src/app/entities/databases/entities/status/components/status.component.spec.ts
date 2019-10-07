import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatabasesStatusComponent } from './status.component';

describe('DatabasesStatusComponent', () => {
	let component: DatabasesStatusComponent;
	let fixture: ComponentFixture<DatabasesStatusComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DatabasesStatusComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DatabasesStatusComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
