import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { TopbarSidenavComponent } from './sidenav.component';
import { LayoutRouterService } from '../../../services/router/router.internal.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('TopbarSidenavComponent', () => {
	let component: TopbarSidenavComponent;
	let fixture: ComponentFixture<TopbarSidenavComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [TopbarSidenavComponent, MatIcon, MatToolbar],
			providers: [LayoutRouterService]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TopbarSidenavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
