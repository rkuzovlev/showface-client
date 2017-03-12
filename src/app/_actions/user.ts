import { Action } from '@ngrx/store';
import { User } from '../_models/user';
import { type } from '../utils';

export const ActionTypes = {
	LOGIN:				type('[User] Login'),
	LOAD_USER:			type('[User] Load user'),
	LOAD_TOKEN:			type('[User] Load token'),
	LOAD_TOKEN_SUCCESS:	type('[User] Load token success'),
	LOGIN_SUCCESS:		type('[User] Login success'),
	LOGIN_ERROR:		type('[User] Login error'),
	LOGOUT:				type('[User] Logout'),
	LOGOUT_SUCCESS:		type('[User] Logout success'),
};

export enum LoginType {
    Facebook = 1,
    VK,
    Google
}

export class LoginAction implements Action {
	type = ActionTypes.LOGIN;
	constructor(public payload: LoginType) { }
}

export class LoadTokenAction implements Action {
	type = ActionTypes.LOAD_TOKEN;
}

export class LoadTokenSuccessAction implements Action {
	type = ActionTypes.LOAD_TOKEN_SUCCESS;
	constructor(public payload: string) { }
}

export class LoadUserAction implements Action {
	type = ActionTypes.LOAD_USER;
}

export class LoginSuccessAction implements Action {
	type = ActionTypes.LOGIN_SUCCESS;
	constructor(public payload: User) { }
}

export class LoginErrorAction implements Action {
	type = ActionTypes.LOGIN_ERROR;
	constructor(public payload: Error) { }
}

export class LogoutAction implements Action {
	type = ActionTypes.LOGOUT;
}

export class LogoutSuccessAction implements Action {
	type = ActionTypes.LOGOUT_SUCCESS;
}

export type Actions
	= LoginAction
	| LoadTokenAction
	| LoadTokenSuccessAction
	| LoginSuccessAction
	| LoginErrorAction
	| LogoutAction
	| LogoutSuccessAction
	| LoadUserAction
	;
