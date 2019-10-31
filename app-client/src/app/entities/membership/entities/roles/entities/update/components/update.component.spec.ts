import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioProjectsUpdateComponent } from './update.component';

describe('PortfolioProjectsUpdateComponent', () => {
	let component: PortfolioProjectsUpdateComponent;
	let fixture: ComponentFixture<PortfolioProjectsUpdateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PortfolioProjectsUpdateComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PortfolioProjectsUpdateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
