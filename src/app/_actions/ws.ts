import { Action } from '@ngrx/store';
import { User } from '../_models/user';
import { type } from '../utils';

export const ActionTypes = {
	CHANGE_STATUS:      type('[WS] Change status'),
	ERROR:      		type('[WS] Error'),
};

export enum Statuses {
    Disconnected = 1,
    Connecting,
    Connected
}

export class ChangeStatusAction implements Action {
	type = ActionTypes.CHANGE_STATUS;
	constructor(public payload: Statuses) { }
}

export class ErrorAction implements Action {
	type = ActionTypes.ERROR;
	constructor(public payload: Error) { }
}


export type Actions
	= ChangeStatusAction
	| ErrorAction
	;
