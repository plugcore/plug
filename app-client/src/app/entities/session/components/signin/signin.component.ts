import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton, MatProgressBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
	selector: 'plug-session-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss']
})
export class SessionSigninComponent implements OnInit {

	@ViewChild(MatProgressBar, { static: false}) progressBar: MatProgressBar;
	@ViewChild(MatButton, { static: false}) submitButton: MatButton;

	signinForm: FormGroup;
	loadingHidden = true;

	constructor(
		private router: Router,
		private authService: AuthService
	) { }

	ngOnInit() {
		this.signinForm = new FormGroup({
			username: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required),
			rememberMe: new FormControl(false)
		});
	}

	signin() {
		const signinData = this.signinForm.value;
		this.submitButton.disabled = true;
		this.loadingHidden = false;
		this.progressBar.mode = 'indeterminate';
		this.authService.login(signinData).subscribe(() => {
			setTimeout(() => {
				this.router.navigate(['/']);
			}, 1000);
		});
	}

}
