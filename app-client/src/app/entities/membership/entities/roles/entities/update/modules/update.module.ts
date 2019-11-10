import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { MembershipRolesUpdateComponent } from '../components/update.component';
import { MembershipRolesUpdateRoutesModule } from './update.routes.module';

@NgModule({
	imports: [
		CommonModule,
		MembershipRolesUpdateRoutesModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatCheckboxModule,
		MatCardModule
	],
	declarations: [
		MembershipRolesUpdateComponent
	]
})
export class MembershipRolesUpdateModule {}
