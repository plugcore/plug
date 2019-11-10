import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeWhile, tap, delay } from 'rxjs/operators';
import { PlugToastService } from '../../../../../../../components/toast/services/toast.service';
import { TablesApiTokenService } from '../../../services/api-token.service';
import { ApiToken, ApiTokenFromDb } from '../../../models/api-token.model';

@Component({
	selector: 'plug-membership-roles-update',
	templateUrl: './update.component.html',
	styleUrls: ['./update.component.scss']
})
export class ApiApiTokenUpdateComponent implements OnInit {

	public isUpdate = false;
	public tokenForm = new FormGroup({
		name: new FormControl('', [Validators.required]),
		credentialsType: new FormControl('', [Validators.required]),
		credentials: new FormGroup({
			token: new FormControl('', []),
			user: new FormControl('', []),
			password: new FormControl('', []),
			payload: new FormControl('', [])
		}),
		quota: new FormGroup({
			calls: new FormControl(undefined, []),
			mb: new FormControl(undefined, []),
			intervalCalls: new FormControl(undefined, []),
			intervalMb: new FormControl(undefined, []),
			intervalCallsVal: new FormControl(undefined, []),
			intervalMbVal: new FormControl(undefined, [])
		}),
		availableApis: new FormGroup({
			tours: new FormGroup({
				findToursInCity: new FormControl(false, [Validators.required]),
				findRelatedProductsForTour: new FormControl(false, [Validators.required])
			}),
			reservations: new FormGroup({
				createReservation: new FormControl(false, [Validators.required]),
				findUserReservations: new FormControl(false, [Validators.required]),
				cancelReservation: new FormControl(false, [Validators.required])
			}),
		})
	});

	private id: number;
	private currentData?: ApiTokenFromDb;

	public isToken = false;
	public isUser = false;
	public isJwt = false;

	constructor(
		private tablesApiTokenService: TablesApiTokenService,
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
			switchMap(() => this.tablesApiTokenService.findById(this.id))
		).subscribe(apitToken => {
			this.currentData = apitToken;
			this.tokenForm.patchValue({
				name: apitToken.name,
				quota: apitToken.quota,
				availableApis: apitToken.availableApis,
				credentialsType: apitToken.credentialsType,
				credentials: (<any>apitToken.credentials).payload ? {
					payload: JSON.stringify((<any>apitToken.credentials).payload)
				} : apitToken.credentials
			});
			this.checkTypeChange(apitToken.credentialsType);
		});
		this.tokenForm.get('credentialsType').valueChanges.pipe(
			delay(0)
		).subscribe(val => {
			this.checkTypeChange(val);
		});
	}

	onSubmit() {
		const formValue = this.tokenForm.value;
		const apiAuth: ApiToken = {
			name: formValue.name,
			credentialsType: formValue.credentialsType,
			credentials: formValue.credentials,
			quota: formValue.quota,
			availableApis: formValue.availableApis
		};
		if (formValue.credentialsType === 'jwt') {
			(<any>apiAuth.credentials).payload = JSON.parse((<any>apiAuth.credentials).payload);
		}
		if (this.isUpdate) {
			apiAuth.id = this.id;
		}
		this.tablesApiTokenService.update(apiAuth).subscribe(res => {
			this.plugToastService.showToast(3000, `Api Token '${apiAuth.name}' ${this.isUpdate ? 'updated' : 'created'} correctly`);
			this.router.navigate(['api', 'api-token']);
		});
	}

	public checkTypeChange(val: string) {
		this.isToken = val === 'token';
		this.isUser = val === 'user';
		this.isJwt = val === 'jwt';
		setTimeout(() => {
			if (this.isToken) {
				this.tokenForm.get('credentials').get('user').clearValidators();
				this.tokenForm.get('credentials').get('user').updateValueAndValidity();
				this.tokenForm.get('credentials').get('password').clearValidators();
				this.tokenForm.get('credentials').get('password').updateValueAndValidity();
				this.tokenForm.get('credentials').get('payload').clearValidators();
				this.tokenForm.get('credentials').get('payload').updateValueAndValidity();
			} else if (this.isJwt) {
				this.tokenForm.get('credentials').get('user').clearValidators();
				this.tokenForm.get('credentials').get('user').updateValueAndValidity();
				this.tokenForm.get('credentials').get('password').clearValidators();
				this.tokenForm.get('credentials').get('password').updateValueAndValidity();
				this.tokenForm.get('credentials').get('payload').setValidators([Validators.required, this.validJsonValidator()]);
				this.tokenForm.get('credentials').get('payload').updateValueAndValidity();
			} else if (this.isUser) {
				this.tokenForm.get('credentials').get('user').setValidators([Validators.required]);
				this.tokenForm.get('credentials').get('user').updateValueAndValidity();
				this.tokenForm.get('credentials').get('password').setValidators([Validators.required]);
				this.tokenForm.get('credentials').get('password').updateValueAndValidity();
				this.tokenForm.get('credentials').get('payload').clearValidators();
				this.tokenForm.get('credentials').get('payload').updateValueAndValidity();
			}
		});
	}

	private validJsonValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			if (control.value && control.value.trim().length > 0) {
				try {
					const a = JSON.parse(control.value);
					return null;
				} catch (error) {
					return {
						invalidJson: true
					};
				}
			} else {
				return null;
			}
		};
	}

}
