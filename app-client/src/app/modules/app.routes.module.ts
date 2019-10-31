import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../components/layout/components/layout.component';

registerLocaleData(localeEs, 'es', localeEsExtra);

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'dashboard'
	},
	{
		path: 'error',
		loadChildren: '../../app/entities/error/modules/error.module#ErrorModule',
		data: {
			title: 'Error',
			breadcrumb: 'Error'
		}
	},
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: 'dashboard',
				loadChildren: '../../app/entities/dashboard/modules/dashboard.module#DashboardModule',
				data: {
					title: 'Dashboard',
					breadcrumb: 'Dashboard'
				}
			},
			{
				path: 'api',
				loadChildren: '../../app/entities/api/modules/api.module#ApiModule',
				data: {
					title: 'API',
					breadcrumb: 'API'
				}
			},
			{
				path: 'data-models',
				loadChildren: '../../app/entities/data-models/modules/data-models.module#DataModelsModule',
				data: {
					title: 'Data Models',
					breadcrumb: 'Data Models'
				}
			},
			{
				path: 'databases',
				loadChildren: '../../app/entities/databases/modules/databases.module#DatabasesModule',
				data: {
					title: 'Databases',
					breadcrumb: 'Databases'
				}
			},
			{
				path: 'plugs',
				loadChildren: '../../app/entities/plugs/modules/plugs.module#PlugsModule',
				data: {
					title: 'Plugs',
					breadcrumb: 'Plugs'
				}
			},
			{
				path: 'scheduled-jobs',
				loadChildren: '../../app/entities/scheduled-jobs/modules/scheduled-jobs.module#ScheduledJobsModule',
				data: {
					title: 'Scheduled Jobs',
					breadcrumb: 'Scheduled Jobs'
				}
			},
			{
				path: 'membership',
				loadChildren: '../../app/entities/membership/modules/membership.module#MembershipModule',
				data: {
					title: 'Membership',
					breadcrumb: 'Membership'
				}
			},
			{
				path: 'system',
				loadChildren: '../../app/entities/system/modules/system.module#SystemModule',
				data: {
					title: 'System',
					breadcrumb: 'System'
				}
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutesModule { }

