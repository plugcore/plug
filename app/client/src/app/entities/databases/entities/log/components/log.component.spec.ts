import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatabasesLogComponent } from './log.component';

describe('DatabasesLogComponent', () => {
	let component: DatabasesLogComponent;
	let fixture: ComponentFixture<DatabasesLogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DatabasesLogComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DatabasesLogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
