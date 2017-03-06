import { Action } from '@ngrx/store';
import { User } from '../_models/user';
import { type } from '../utils';

export const ActionTypes = {
	LOGIN:			type('[User] Login'),
	LOGIN_SUCCESS:	type('[User] Login success'),
	LOGIN_ERROR:	type('[User] Login error'),
	LOGOUT:			type('[User] Logout'),
};

export enum LoginType {
    Facebook = 1
}

export interface LoginSuccess { 
	user: User, 
	token: string 
}

export class LoginAction implements Action {
	type = ActionTypes.LOGIN;
	constructor(public payload: LoginType) { }
}

export class LoginSuccessAction implements Action {
	type = ActionTypes.LOGIN_SUCCESS;
	constructor(public payload: LoginSuccess) { }
}

export class LoginErrorAction implements Action {
	type = ActionTypes.LOGIN_ERROR;
	constructor(public payload: Error) { }
}

export class LogoutAction implements Action {
	type = ActionTypes.LOGOUT;
	constructor() { }
}

export type Actions
	= LoginAction
	| LoginSuccessAction
	| LoginErrorAction
	| LogoutAction
	;
