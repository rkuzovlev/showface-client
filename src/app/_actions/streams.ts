import { Action } from '@ngrx/store';
import { Stream } from '../_models/stream';
import { type } from '../utils';

export const ActionTypes = {
	OPEN_STREAM: 			type('[Streams] Open stream'),
	OPEN_STREAM_SUCCESS: 	type('[Streams] Open stream success'),
	OPEN_STREAM_ERROR: 		type('[Streams] Open stream error'),
	
	CLOSE_STREAM: 			type('[Streams] Close stream'),
	CLOSE_STREAM_SUCCESS: 	type('[Streams] Close stream success'),
	CLOSE_STREAM_ERROR:		type('[Streams] Close stream error'),

	ADD_STREAM:		type('[Streams] Add stream'),
	LOAD_SUCCESS:	type('[Streams] Load success'),
};


export class CloseStreamAction implements Action {
	type = ActionTypes.CLOSE_STREAM;
	constructor(public payload: number) { }
}

export class CloseStreamSuccessAction implements Action {
	type = ActionTypes.CLOSE_STREAM_SUCCESS;
}

export class CloseStreamErrorAction implements Action {
	type = ActionTypes.CLOSE_STREAM_ERROR;
	constructor(public payload: Error) { }
}


export class OpenStreamAction implements Action {
	type = ActionTypes.OPEN_STREAM;
	constructor(public payload: number) { }
}

export class OpenStreamSuccessAction implements Action {
	type = ActionTypes.OPEN_STREAM_SUCCESS;
}

export class OpenStreamErrorAction implements Action {
	type = ActionTypes.OPEN_STREAM_ERROR;
	constructor(public payload: Error) { }
}


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
	| CloseStreamAction
	| CloseStreamSuccessAction
	| CloseStreamErrorAction
	| OpenStreamAction
	| OpenStreamSuccessAction
	| OpenStreamErrorAction
	| LoadSuccessAction
	;
