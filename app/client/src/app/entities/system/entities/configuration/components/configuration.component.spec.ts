import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemConfigurationComponent } from './configuration.component';
import { PlugDialogService } from '../../../../../components/dialog/services/dialog.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('SystemConfigurationComponent', () => {
	let component: SystemConfigurationComponent;
	let fixture: ComponentFixture<SystemConfigurationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [MatDialogModule],
			declarations: [SystemConfigurationComponent],
			providers: [PlugDialogService]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SystemConfigurationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
