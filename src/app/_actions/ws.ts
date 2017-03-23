import { Action } from '@ngrx/store';
import { User } from '../_models/user';
import { type } from '../utils';

export const ActionTypes = {
	CHANGE_STATUS:      type('[WS] Change status'),
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


export type Actions
	= ChangeStatusAction
	;
