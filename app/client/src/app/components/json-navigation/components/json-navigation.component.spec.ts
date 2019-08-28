import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonNavigationComponent } from './json-navigation.component';

describe('JsonNavigationComponent', () => {
	let component: JsonNavigationComponent;
	let fixture: ComponentFixture<JsonNavigationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [JsonNavigationComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(JsonNavigationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
