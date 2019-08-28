import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { PlugToastService } from '../../../../../../../components/toast/services/toast.service';
import { User } from '../../../models/users.model';
import { TablesUsersService } from '../../../services/users.service';
import { TablesRolesService } from '../../../../roles/services/roles.service';
import { RoleFromDb } from '../../../../roles/models/roles.model';

@Component({
	selector: 'plug-membership-users-update',
	templateUrl: './update.component.html',
	styleUrls: ['./update.component.scss']
})
export class MembershipUsersUpdateComponent implements OnInit {

	public isUpdate = false;
	public userForm = new FormGroup({
		name: new FormControl('', [Validators.required]),
		role: new FormControl('', [Validators.required])
	});
	public roles: RoleFromDb[] = [];

	private id: number;

	constructor(
		private tablesUsersService: TablesUsersService,
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
			switchMap(() => this.tablesUsersService.findById(this.id)),
			map(user => {
				return {
					name: user.name,
					role: user.role
				};
			})
		).subscribe(user => {
			this.userForm.controls['name'].setValue(user.name);
			this.userForm.controls['role'].setValue(user.role);
		});
		this.roles = this.tablesRolesService.findAll();
	}

	onSubmit() {
		const user: User = {
			name: this.userForm.get('name').value,
			role: this.userForm.get('role').value
		};
		if (this.isUpdate) {
			user.id = this.id;
		}
		this.tablesUsersService.update(user).subscribe(res => {
			this.plugToastService.showToast(3000, `User '${user.name}' ${this.isUpdate ? 'updated' : 'created'} correctly`);
			this.router.navigate(['membership', 'users']);
		});
	}

}
