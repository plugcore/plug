import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilterComponent } from './table-filter.component';

describe('TableFilterComponent', () => {
	let component: TableFilterComponent;
	let fixture: ComponentFixture<TableFilterComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TableFilterComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TableFilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
