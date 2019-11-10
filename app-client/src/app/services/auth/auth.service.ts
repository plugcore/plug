import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private readonly JWT_TOKEN = 'JWT_TOKEN';
	private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
	private loggedUser: string;

	constructor(
		private router: Router
	) {
		this.loggedUser = this.getJwtToken();
	}

	login(user: { username: string, password: string }): Observable<boolean> {
		// TODO: Llamar a servicio de back para que realice el login pasando username y password
		/* return this.http.post<any>(`${config.apiUrl}/login`, user)
			.pipe(
				tap(tokens => this.doLoginUser(user.username, tokens)),
				mapTo(true),
				catchError(error => {
					alert(error.error);
					return of(false);
				})); */
		return of(true).pipe(
			tap(tokens => this.doLoginUser(user.username, {
				jwt: 'tokenjwt',
				refreshToken: 'tokenrefresh'
			})),
			mapTo(true),
			catchError(error => {
				alert(error.error);
				return of(false);
			})
		);
	}

	logout() {
		// TODO: Llamar a servicio de back para que realice el logout pasando el refresh token
		/* return this.http.post<any>(`${config.apiUrl}/logout`, {
			'refreshToken': this.getRefreshToken()
		}).pipe(
			tap(() => this.doLogoutUser()),
			mapTo(true),
			catchError(error => {
				alert(error.error);
				return of(false);
			})); */
		return of(true).pipe(
			tap(() => this.doLogoutUser()),
			mapTo(true),
			catchError(error => {
				alert(error.error);
				return of(false);
			}),
			tap(() => {
				window.location = window.location;
			})
		);
	}

	isLoggedIn() {
		return this.loggedUser !== undefined && this.loggedUser !== null;
	}

	refreshToken(): Observable<any> {
		/* return this.http.post<any>(`${config.apiUrl}/refresh`, {
			'refreshToken': this.getRefreshToken()
		}).pipe(tap((token: Token) => {
			this.storeJwtToken(token.jwt);
		})); */
		return of(null);
	}

	public getJwtToken() {
		return localStorage.getItem(this.JWT_TOKEN);
	}

	private doLoginUser(username: string, token: Token) {
		this.loggedUser = username;
		this.storeTokens(token);
	}

	private doLogoutUser() {
		this.loggedUser = undefined;
		this.removeTokens();
	}

	private storeTokens(token: Token) {
		localStorage.setItem(this.JWT_TOKEN, token.jwt);
		localStorage.setItem(this.REFRESH_TOKEN, token.refreshToken);
	}

	private removeTokens() {
		localStorage.removeItem(this.JWT_TOKEN);
		localStorage.removeItem(this.REFRESH_TOKEN);
	}

	private getRefreshToken() {
		return localStorage.getItem(this.REFRESH_TOKEN);
	}
}
