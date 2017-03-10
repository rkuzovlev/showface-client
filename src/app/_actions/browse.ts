import { Action } from '@ngrx/store';
import { Stream } from '../_models/stream';
import { type } from '../utils';

export const ActionTypes = {
	ADD_STREAM:		type('[Browse] Add stream'),
	LOAD_SUCCESS:	type('[Browse] Load success'),
};


export class AddStreamAction implements Action {
	type = ActionTypes.ADD_STREAM;
	constructor(public payload: Stream) { }
}

export class LoadSuccessAction implements Action {
	type = ActionTypes.LOAD_SUCCESS;
	constructor(public payload: Stream[]) { }
}

export type Actions
	= AddStreamAction
	| LoadSuccessAction
	;
