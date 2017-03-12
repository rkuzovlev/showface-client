import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Headers } from '@angular/http';

import * as reducers from '../_reducers';
import { User } from "../_models/user";
import { LoginType, LoginErrorAction } from "../_actions/user";
import { ApiService } from "../_services/api.service";


@Injectable()
export class AuthService {
	loginWindow: Window
	interval

	constructor(
		private store: Store<reducers.State>,
		private api: ApiService,
	) { }

	getCurrentUser(): Observable<User> {
		return this.api.get('/user').map(res => res.json() as User);
	}

	/**
	 *	Some magic shit happens here
	 *
	 *	@return Promise<api_token: string>
	 */
	login(type: LoginType): Promise<string> {
		let url = "/api/login/";

		// TODO: change this behavior, may create unresolved promise
		if (this.loginWindow){
			this.closeWindow();
		}

		switch (type) {
			case LoginType.Facebook:
				url += 'facebook'
				break;
		}

		return new Promise((resolve, reject) => {
			const w = 700,
				  h = 600,
				  l = screen.width / 2 - w / 2,
				  t = screen.height / 2 - h / 2;

			this.loginWindow = window.open(url, 'login', `width=${w},height=${h},left=${l},top=${t},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=no`);
			this.interval = setInterval(() => {
				this.checkWindowStatus(resolve, reject);
			}, 100);
		});
	}

	private closeWindow():void {
		if (this.interval){
			clearInterval(this.interval);
		}

		if (this.loginWindow){
			this.loginWindow.close();
			this.loginWindow = null;
		}
	}

	private checkWindowStatus(resolve, reject):void {
		if (this.loginWindow.closed) {
			reject(new Error('Unknown error'));
			return this.closeWindow();
		}

		let path = this.loginWindow.location.pathname;
		let search = this.loginWindow.location.search;
		let reg = new RegExp("\\?token=(\\w+)", "g");

		if (path == '/api/login/token'){
			let token = reg.exec(search)[1];

			console.log('token', token);
			
			if (token){
				resolve(token);
			} else {
				reject(new Error('Token is not found'));
			}
			this.closeWindow();
		}
	}
}