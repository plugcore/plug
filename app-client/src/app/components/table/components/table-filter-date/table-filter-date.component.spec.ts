import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilterDateComponent } from './table-filter-date.component';

describe('TableFilterDateComponent', () => {
	let component: TableFilterDateComponent;
	let fixture: ComponentFixture<TableFilterDateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TableFilterDateComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TableFilterDateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
