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
import { AuthService } from '../_services/auth.service';
import * as userActions from '../_actions/user';
import { User } from '../_models/user';


@Injectable()
export class UserEffects {
	constructor(
		private actions$: Actions, 
		private http: Http,
		private auth: AuthService,
	) { }


	// @Effect()
	// token$: Observable<Action> = this.actions$
	// 	.ofType(userActions.ActionTypes.NEW_TOKEN)
	// 	.map((action: userActions.NewTokenAction) => action.payload)
	// 	.switchMap(token => {
	// 		if (token === '') {
	// 			return of(new userActions.LoginErrorAction(new Error('Token is empty')));
	// 		}

	// 		return this.api.get('/users/current')
	// 			.map(res => res.json() as User)
	// 			.map((user: User) => {
	// 				let ls: userActions.LoginSuccess = { user: user, token: token };
	// 				return ls;
	// 			})
	// 			.map((ls: userActions.LoginSuccess) => {
	// 				return new userActions.LoginSuccessAction(ls);
	// 			})
	// 			.catch((error) => of(new userActions.LoginErrorAction(new Error(error))));
	// 	});


	@Effect()
	login$: Observable<Action> = this.actions$
		.ofType(userActions.ActionTypes.LOGIN)
		.map((action: userActions.LoginAction) => action.payload)
		.switchMap((loginType: userActions.LoginType) => this.auth.login(loginType))
		.switchMap((token: string) => {
			// TODO: shit happens here :( need to rewrite
			const h = new Headers({'Authorization': 'Bearer ' + token});
			return this.http.get('/api/users/current', { headers: h })
				.map(res => res.json() as User)
				.map((user: User) => {
					const ls: userActions.LoginSuccess = {
						token: token,
						user: user
					};
					return new userActions.LoginSuccessAction(ls);
				});
		})
		.catch((err: Error) => of(new userActions.LoginErrorAction(err)));
}