import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { ApiService } from '../_services/api.service';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import * as userActions from '../_actions/user';
import * as usersActions from '../_actions/users';
import { User } from '../_models/user';


@Injectable()
export class UserEffects {
	constructor(
		private actions$: Actions, 
		private http: Http,
		private auth: AuthService,
		private storage: StorageService,
	){}

	@Effect()
	logout$: Observable<Action> = this.actions$
		.ofType(userActions.ActionTypes.LOGOUT)
		.switchMap(() => {
			this.storage.remove('token');
			return empty();
		});


	@Effect()
	loadToken$: Observable<Action> = this.actions$
		.ofType(userActions.ActionTypes.LOAD_TOKEN)
		.map(() => this.storage.get('token'))
		.filter((token: string) => !!token && token.length > 0)
		.switchMap((token: string) => {
			return this.auth.getCurrentUser(token).map((user: User) => {
				const ls: userActions.LoginSuccess = {
					token: token,
					user: user
				};
				return ls;
			});
		}).mergeMap((ls: userActions.LoginSuccess) => {
			return [
				new usersActions.AddUserAction(ls.user),
				new userActions.LoginSuccessAction(ls)
			];
		}).catch(err => {
			this.storage.remove('token');
			return empty();
		});



	@Effect()
	login$: Observable<Action> = this.actions$
		.ofType(userActions.ActionTypes.LOGIN)
		.map((action: userActions.LoginAction) => action.payload)
		.switchMap((loginType: userActions.LoginType) => this.auth.login(loginType))
		.switchMap((token: string) => {
			this.storage.set('token', token);

			return this.auth.getCurrentUser(token)
				.map((user: User) => {
					const ls: userActions.LoginSuccess = {
						token: token,
						user: user
					};
					return ls;
				});		
		})
		.mergeMap((ls: userActions.LoginSuccess) => {
			return [
				new usersActions.AddUserAction(ls.user),
				new userActions.LoginSuccessAction(ls)
			];
		})
		.catch((err: Error) => {
			this.storage.remove('token');
			return of(new userActions.LoginErrorAction(err))
		});
}