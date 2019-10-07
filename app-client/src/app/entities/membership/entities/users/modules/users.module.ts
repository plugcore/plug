import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MembershipUsersComponent } from '../components/users.component';
import { MembershipUsersRoutesModule } from './users.routes.module';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';


@NgModule({
	imports: [
		CommonModule,
		MembershipUsersRoutesModule,
		PlugTableModule
	],
	declarations: [
		MembershipUsersComponent
	]
})
export class MembershipUsersModule {}
