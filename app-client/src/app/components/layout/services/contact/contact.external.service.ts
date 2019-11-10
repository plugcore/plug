import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ContactExternalService {

	private readonly basePath = '/api/contact/demo';

	constructor(
		private http: HttpClient
	) { }

	public createMessage(email: string): Observable<any> {
		return this.http.post<any>(this.basePath, { email });
	}

}
