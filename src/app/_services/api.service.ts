import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Http, RequestOptionsArgs, Response } from '@angular/http'
import * as urlJoin from 'url-join';

import * as reducers from '../_reducers';

@Injectable()
export class ApiService {
	private apiUrl: string = '/api/';

	constructor(
		private store: Store<reducers.State>,
		private http: Http,
	) { }

	get(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return this.http.get(urlJoin(this.apiUrl, url));
	}
}