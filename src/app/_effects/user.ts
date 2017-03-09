import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { ApiService } from '../_services/api.service';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import * as userActions from '../_actions/user';
import { User } from '../_models/user';


@Injectable()
export class UserEffects {
	constructor(
		private actions$: Actions, 
		private http: Http,
		private auth: AuthService,
		private storage: StorageService,
	) { }


	@Effect()
	loadToken$: Observable<Action> = this.actions$
		.ofType(userActions.ActionTypes.LOAD_TOKEN)
		.switchMap(() => {
			let token = this.storage.get('token');

			if (token){
				return this.auth.getCurrentUser(token).map((user: User) => {
					const ls: userActions.LoginSuccess = {
						token: token,
						user: user
					};
					return new userActions.LoginSuccessAction(ls);
				}).catch(err => {
					this.storage.remove('token');
					return empty();
				});
			}

			return empty();
		});



	@Effect()
	login$: Observable<Action> = this.actions$
		.ofType(userActions.ActionTypes.LOGIN)
		.map((action: userActions.LoginAction) => action.payload)
		.switchMap((loginType: userActions.LoginType) => this.auth.login(loginType))
		.switchMap((token: string) => {
			this.storage.set('token', token);

			return this.auth.getCurrentUser(token).map((user: User) => {
				const ls: userActions.LoginSuccess = {
					token: token,
					user: user
				};
				return new userActions.LoginSuccessAction(ls);
			});
		})
		.catch((err: Error) => {
			this.storage.remove('token');
			return of(new userActions.LoginErrorAction(err))
		});
}