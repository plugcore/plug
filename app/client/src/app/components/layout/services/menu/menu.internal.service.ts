import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
	type: string;       // Possible values: link/dropDown/icon/separator/extLink
	name?: string;      // Used as display text for item and title for separator type
	state?: string;     // Router state
	icon?: string;      // Material icon name
	tooltip?: string;   // Tooltip text
	disabled?: boolean; // If true, item will not be appeared in sidenav.
	sub?: IChildItem[]; // Dropdown items
}
interface IChildItem {
	type?: string;
	name: string;       // Display text
	state?: string;     // Router state
	icon?: string;
	sub?: IChildItem[];
}
@Injectable()
export class LayoutMenuService {

	iconMenu: IMenuItem[] = [
		{
			type: 'separator',
			name: 'HOME'
		},
		{
			name: 'Dashboard',
			type: 'link',
			tooltip: 'Dashboard',
			icon: 'dashboard',
			state: 'dashboard'
		},
		{
			type: 'separator',
			name: 'DATA MODELS'
		},
		{
			name: 'Documentation',
			type: 'link',
			tooltip: 'Documentation',
			icon: 'chrome_reader_mode',
			state: 'data-models/documentation'
		},
		{
			type: 'separator',
			name: 'DATABASES'
		},
		{
			name: 'Status',
			type: 'link',
			tooltip: 'Status',
			icon: 'assessment',
			state: 'databases/status'
		},
		{
			name: 'Documentation',
			type: 'link',
			tooltip: 'Documentation',
			icon: 'chrome_reader_mode',
			state: 'databases/documentation'
		},
		{
			name: 'Log',
			type: 'link',
			tooltip: 'Log',
			icon: 'line_style',
			state: 'databases/log'
		},
		{
			type: 'separator',
			name: 'API'
		},
		{
			name: 'Status',
			type: 'link',
			tooltip: 'Status',
			icon: 'assessment',
			state: 'api/status'
		},
		{
			name: 'Documentation',
			type: 'link',
			tooltip: 'Documentation',
			icon: 'chrome_reader_mode',
			state: 'api/documentation'
		},
		{
			name: 'Log',
			type: 'link',
			tooltip: 'Log',
			icon: 'line_style',
			state: 'api/log'
		},
		{
			type: 'separator',
			name: 'PLUGS'
		},
		{
			name: 'Status',
			type: 'link',
			tooltip: 'Status',
			icon: 'assessment',
			state: 'plugs/status'
		},
		{
			name: 'Documentation',
			type: 'link',
			tooltip: 'Documentation',
			icon: 'chrome_reader_mode',
			state: 'plugs/documentation'
		},
		{
			name: 'Log',
			type: 'link',
			tooltip: 'Log',
			icon: 'line_style',
			state: 'plugs/log'
		},
		{
			type: 'separator',
			name: 'SCHEDULED JOBS'
		},
		{
			name: 'Status',
			type: 'link',
			tooltip: 'Status',
			icon: 'assessment',
			state: 'scheduled-jobs/status'
		},
		{
			name: 'Documentation',
			type: 'link',
			tooltip: 'Documentation',
			icon: 'chrome_reader_mode',
			state: 'scheduled-jobs/documentation'
		},
		{
			name: 'Log',
			type: 'link',
			tooltip: 'Log',
			icon: 'line_style',
			state: 'scheduled-jobs/log'
		},
		{
			type: 'separator',
			name: 'MEMBERSHIP'
		},
		{
			name: 'Users',
			type: 'link',
			tooltip: 'Users',
			icon: 'person',
			state: 'membership/users'
		},
		{
			name: 'Roles',
			type: 'link',
			tooltip: 'Roles',
			icon: 'directions_walk',
			state: 'membership/roles'
		},
		{
			type: 'separator',
			name: 'SYSTEM'
		},
		{
			name: 'Configuration',
			type: 'link',
			tooltip: 'Configuration',
			icon: 'settings',
			state: 'system/configuration'
		},
		{
			name: 'Log',
			type: 'link',
			tooltip: 'Log',
			icon: 'line_style',
			state: 'system/log'
		},
		/* {
		  name: 'Multi Level',
		  type: 'dropDown',
		  tooltip: 'Multi Level',
		  icon: 'format_align_center',
		  state: '',
		  sub: [
			{
			  name: 'Level Two', type: 'dropDown', state: 'fake-1', sub: [
				{ name: 'Level Three', state: 'fake-2' },
				{ name: 'Level Three', state: 'fake-3' }
			  ]
			},
			{ name: 'Level Two', state: 'fake-4' },
			{ name: 'Level Two', state: 'fake-5' }
		  ]
		} */
	];

	iconTypeMenuTitle = 'Frequently Accessed';

	constructor() { }

	menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
	menuItems$ = this.menuItems.asObservable();
}
