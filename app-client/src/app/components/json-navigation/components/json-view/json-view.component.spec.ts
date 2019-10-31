import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonNavigationJsonViewComponent } from './json-view.component';

describe('JsonNavigationJsonViewComponent', () => {
	let component: JsonNavigationJsonViewComponent;
	let fixture: ComponentFixture<JsonNavigationJsonViewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [JsonNavigationJsonViewComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(JsonNavigationJsonViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
