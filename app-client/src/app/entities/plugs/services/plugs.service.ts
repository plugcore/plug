import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITablesResults } from '../../../components/table/interfaces/table.interface';
import { PlugFromDb } from '../models/plugs.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class PlugsService {

	private readonly basePath = '/plug';
	private readonly getPlugsStatusPath = this.basePath + '/status';

	constructor(private http: HttpClient) { }

	public search(): Observable<ITablesResults<PlugFromDb>> {
		return this.http.get<any>(this.getPlugsStatusPath);
	}

	public findById(id: number): Observable<PlugFromDb> {
		return this.http.get<any>(this.getPlugsStatusPath).pipe(
			map(r => r.data.find(d => d.id === id))
		);
	}
}

