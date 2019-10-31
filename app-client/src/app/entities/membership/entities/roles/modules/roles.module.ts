import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MembershipRolesComponent } from '../components/roles.component';
import { MembershipRolesRoutesModule } from './roles.routes.module';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';


@NgModule({
	imports: [
		CommonModule,
		MembershipRolesRoutesModule,
		PlugTableModule
	],
	declarations: [
		MembershipRolesComponent
	]
})
export class MembershipRolesModule {}
