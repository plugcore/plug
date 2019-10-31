import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { PlugToastService } from '../../../../../../../components/toast/services/toast.service';
import { Role } from '../../../models/roles.model';
import { TablesRolesService } from '../../../services/roles.service';

@Component({
	selector: 'plug-membership-roles-update',
	templateUrl: './update.component.html',
	styleUrls: ['./update.component.scss']
})
export class MembershipRolesUpdateComponent implements OnInit {

	public isUpdate = false;
	public roleForm = new FormGroup({
		name: new FormControl('', [Validators.required]),
		permissions: new FormGroup({
			dataModelsDocumentation: new FormControl(false, [Validators.required]),
			databasesStatus: new FormControl(false, [Validators.required]),
			databasesDocumentation: new FormControl(false, [Validators.required]),
			databasesLog: new FormControl(false, [Validators.required]),
			apiStatus: new FormControl(false, [Validators.required]),
			apiDocumentation: new FormControl(false, [Validators.required]),
			apiLog: new FormControl(false, [Validators.required]),
			plugsStatus: new FormControl(false, [Validators.required]),
			plugsDocumentation: new FormControl(false, [Validators.required]),
			plugsLog: new FormControl(false, [Validators.required]),
			scheduledJobsStatus: new FormControl(false, [Validators.required]),
			scheduledJobsDocumentation: new FormControl(false, [Validators.required]),
			scheduledJobsLog: new FormControl(false, [Validators.required]),
			membershipUsers: new FormControl(false, [Validators.required]),
			membershipRoles: new FormControl(false, [Validators.required]),
			systemConfiguration: new FormControl(false, [Validators.required]),
			systemLog: new FormControl(false, [Validators.required])
		})
	});

	private id: number;

	constructor(
		private tablesRolesService: TablesRolesService,
		private plugToastService: PlugToastService,
		private route: ActivatedRoute,
		private router: Router
	) {
	}

	ngOnInit() {
		this.route.params.pipe(
			map(params => parseInt(params['id'], 10)),
			takeWhile(id => !isNaN(id)),
			tap(id => { this.id = id; this.isUpdate = true; }),
			switchMap(() => this.tablesRolesService.findById(this.id)),
			map(role => {
				return {
					name: role.name,
					permissions: role.permissions
				};
			})
		).subscribe(role => {
			this.roleForm.controls['name'].setValue(role.name);
			this.roleForm.controls['permissions'].setValue(role.permissions);
		});
	}

	onSubmit() {
		const role: Role = {
			name: this.roleForm.get('name').value,
			permissions: this.roleForm.get('permissions').value
		};
		if (this.isUpdate) {
			role.id = this.id;
		}
		this.tablesRolesService.update(role).subscribe(res => {
			this.plugToastService.showToast(3000, `Role '${role.name}' ${this.isUpdate ? 'updated' : 'created'} correctly`);
			this.router.navigate(['membership', 'roles']);
		});
	}

}
