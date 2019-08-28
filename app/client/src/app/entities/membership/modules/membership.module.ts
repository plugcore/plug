import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MembershipRoutesModule } from './membership.routes.module';

@NgModule({
	imports: [
		CommonModule,
		MembershipRoutesModule
	]
})
export class MembershipModule {}
