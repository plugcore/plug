import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { TopbarTopnavComponent } from './topnav.component';


describe('TopbarTopnavComponent', () => {
	let component: TopbarTopnavComponent;
	let fixture: ComponentFixture<TopbarTopnavComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TopbarTopnavComponent, MatIcon]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TopbarTopnavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
