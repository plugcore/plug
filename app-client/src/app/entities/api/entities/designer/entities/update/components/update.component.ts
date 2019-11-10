import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { PlugToastService } from '../../../../../../../components/toast/services/toast.service';
import { TablesApiDesignerService } from '../../../services/designer.service';
import { ApiFromDb, IApiProxy, ApiTypeDetector } from '../../../models/designer.model';
import { MatChipInputEvent } from '@angular/material';

@Component({
	selector: 'plug-membership-roles-update',
	templateUrl: './update.component.html',
	styleUrls: ['./update.component.scss']
})
export class ApiDesignerUpdateComponent implements OnInit {

	private urlRegex = 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)';
	public isUpdate = false;
	public apiForm = new FormGroup({
		method: new FormControl('', [Validators.required]),
		uri: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
		tags: new FormControl(undefined, []),
		documentation: new FormGroup({
			request: new FormControl('', [this.validJsonValidator()]),
			response: new FormControl('', [this.validJsonValidator()]),
			parameters: new FormControl('', [this.validJsonValidator()]),
			urlparameters: new FormControl('', [this.validJsonValidator()]),
			headers: new FormControl('', [this.validJsonValidator()])
		}),
		targetUrl: new FormControl('', []),
		retries: new FormControl(5, []),
		timeout: new FormControl(10, []),
	});

	private id: number;
	public currentData?: ApiFromDb;
	public isApiProxy = true;

	public visible = true;
	public selectable = true;
	public removable = true;
	public addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];

	constructor(
		private tablesApiDesignerService: TablesApiDesignerService,
		private plugToastService: PlugToastService,
		private route: ActivatedRoute,
		private router: Router
	) {
	}

	public ngOnInit() {
		this.route.params.pipe(
			map(params => parseInt(params['id'], 10)),
			tap(id => {
				if (isNaN(id)) {
					this.apiForm.get('targetUrl').setValidators([
						Validators.required
					]);
				}
			}),
			takeWhile(id => !isNaN(id)),
			tap(id => { this.id = id; this.isUpdate = true; }),
			switchMap(() => this.tablesApiDesignerService.findById(this.id))
		).subscribe(appiInfo => {
			this.currentData = appiInfo;
			this.apiForm.patchValue({
				method: this.currentData.method,
				uri: this.currentData.uri,
				description: this.currentData.description,
				tags: this.currentData.tags,
				documentation: {
					request: this.currentData.documentation && this.currentData.documentation.request ?
						JSON.stringify(this.currentData.documentation.request, undefined, 4) : '',
					response: this.currentData.documentation && this.currentData.documentation.response ?
						JSON.stringify(this.currentData.documentation.response, undefined, 4) : '',
					parameters: this.currentData.documentation && this.currentData.documentation.parameters ?
						JSON.stringify(this.currentData.documentation.parameters, undefined, 4) : '',
					urlparameters: this.currentData.documentation && this.currentData.documentation.urlparameters ?
						JSON.stringify(this.currentData.documentation.urlparameters, undefined, 4) : '',
					headers: this.currentData.documentation && this.currentData.documentation.headers ?
						JSON.stringify(this.currentData.documentation.headers, undefined, 4) : ''
				}
			});
			if (ApiTypeDetector.isApiProxy(this.currentData)) {
				this.isApiProxy = true;
				this.apiForm.patchValue({
					targetUrl: this.currentData.targetUrl,
					retries: this.currentData.retries || 5,
					timeout: this.currentData.timeout || 10
				});
				this.apiForm.get('targetUrl').setValidators([
					Validators.required
				]);
			} else {
				this.isApiProxy = false;
			}
		});
	}

	public onSubmit() {
		const formValue = this.apiForm.value;
		const apiProxy: IApiProxy = {
			method: formValue.method,
			uri: formValue.uri,
			description: formValue.description,
			tags: formValue.tags,
			documentation: {
				request: this.tryToCreateObject(formValue.documentation.request),
				response: this.tryToCreateObject(formValue.documentation.response),
				parameters: this.tryToCreateObject(formValue.documentation.parameters),
				urlparameters: this.tryToCreateObject(formValue.documentation.urlparameters),
				headers: this.tryToCreateObject(formValue.documentation.headers)
			},
			targetUrl: formValue.targetUrl,
			retries: formValue.retries,
			timeout: formValue.timeout
		};
		if (this.isUpdate) {
			apiProxy.id = this.id;
		}
		this.tablesApiDesignerService.update(apiProxy).subscribe(res => {
			this.plugToastService.showToast(3000, `Api Token '${apiProxy.method} ${apiProxy.uri}' ` +
				`${this.isUpdate ? 'updated' : 'created'} correctly`);
			this.router.navigate(['api', 'designer']);
		});
	}

	private tryToCreateObject(inp: string | undefined) {
		if (!inp || inp.trim().length === 0) {
			return undefined;
		} else {
			try {
				return JSON.parse(inp);
			} catch (error) {
				return undefined;
			}
		}
	}

	public add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our fruit
		if ((value || '').trim()) {
			const formValue = this.apiForm.value;
			if (formValue.tags) {
				this.apiForm.patchValue({
					tags: (<string[]>formValue.tags).slice().concat(value.trim())
				});
			} else {
				this.apiForm.patchValue({
					tags: [value.trim()]
				});
			}
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
	}

	public remove(tag: string): void {
		const formValue = this.apiForm.value;
		const newTagsArray = (<string[]>formValue.tags).filter(t => t !== tag);
		this.apiForm.patchValue({
			tags: newTagsArray.length > 0 ? newTagsArray : undefined
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
