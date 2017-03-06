import { Action } from '@ngrx/store';
import { User } from '../_models/user';
import { type } from '../utils';

export const ActionTypes = {
	ADD_USER:		type('[Users] Add user'),
	ADD_USERS:		type('[Users] Add users'),
};

export class AddUserAction implements Action {
	type = ActionTypes.ADD_USER;
	constructor(public payload: User) { }
}

export class AddUsersAction implements Action {
	type = ActionTypes.ADD_USERS;
	constructor(public payload: User[]) { }
}

export type Actions
	= AddUserAction
	| AddUsersAction
	;
