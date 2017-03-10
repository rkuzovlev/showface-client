import { Action } from '@ngrx/store';
import { User } from '../_models/user';
import { type } from '../utils';

export const ActionTypes = {
	SET_VALUE:		type('[Progress] Set value'),
	ADD_TO_VALUE:	type('[Progress] Add to value'),
	COMPLETE:		type('[Progress] Complete'),
};

export class SetValueAction implements Action {
	type = ActionTypes.SET_VALUE;
	constructor(public payload: number) { }
}

export class AddToValueAction implements Action {
	type = ActionTypes.ADD_TO_VALUE;
	constructor(public payload: number) { }
}

export class CompleteAction implements Action {
	type = ActionTypes.COMPLETE;
}

export type Actions
	= SetValueAction
	| CompleteAction
	| AddToValueAction
	;
