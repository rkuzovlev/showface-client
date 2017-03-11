import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Http, RequestOptionsArgs, Response, RequestOptions, Headers } from '@angular/http'
import * as urlJoin from 'url-join';

import * as reducers from '../_reducers';

@Injectable()
export class ApiService {
	private apiUrl: string = '/api/';
	private token: string = null;

	constructor (
		private store: Store<reducers.State>,
		private http: Http,
	){
		this.store.select(reducers.getUserState).subscribe(userState => {
			this.token = userState.login.token;
		});
	}

	private addToken(options?: RequestOptionsArgs): RequestOptions{
		var newOptions: RequestOptions;

		if (options){
			newOptions = new RequestOptions(options);
		} else {
			newOptions = new RequestOptions();
		}

		if (!newOptions.headers){
			newOptions.headers = new Headers();
		}

		if (this.token && this.token.length > 0){
			newOptions.headers.set("Authorization", "Bearer " + this.token);
		}

		return newOptions;
	}

	get(url: string, options?: RequestOptionsArgs): Observable<Response> {
		console.log('ApiService get', urlJoin(this.apiUrl, url));

		var newOptions = this.addToken(options);

		return this.http.get(urlJoin(this.apiUrl, url), newOptions);
	}

	post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		console.log('ApiService post', urlJoin(this.apiUrl, url));
		
		var newOptions = this.addToken(options);
		
		return this.http.post(urlJoin(this.apiUrl, url), body, options);
	}
}