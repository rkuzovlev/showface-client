import { Action } from '@ngrx/store';
import { Stream } from '../_models/stream';
import { User } from '../_models/user';
import { type } from '../utils';

export const ActionTypes = {	
	LOAD_STREAM: 			type('[Stream] Load stream'),
	LOAD_STREAMERS: 		type('[Stream] Load streamers'),
	ADD_STREAMER: 			type('[Stream] Add streamer'),
	REMOVE_STREAMER: 		type('[Stream] Remove streamer'),
	LOAD_STREAMERS_ERROR: 	type('[Stream] Load streamers error'),
	LOAD_MODERATORS: 		type('[Stream] Load moderators'),
	ADD_MODERATOR: 			type('[Stream] Add moderator'),
	REMOVE_MODERATOR: 		type('[Stream] Remove moderator'),
	LOAD_MODERATORS_ERROR: 	type('[Stream] Load moderators error'),
};

export class LoadStreamAction implements Action {
	type = ActionTypes.LOAD_STREAM;
	constructor(public payload: Stream) { }
}

// streamers
export class LoadStreamersAction implements Action {
	type = ActionTypes.LOAD_STREAMERS;
	constructor(public payload: User[]) { }
}

export class AddStreamerAction implements Action {
	type = ActionTypes.ADD_STREAMER;
	constructor(public payload: User) { }
}

export class RemoveStreamerAction implements Action {
	type = ActionTypes.REMOVE_STREAMER;
	constructor(public payload: User) { }
}

export class LoadStreamersErrorAction implements Action {
	type = ActionTypes.LOAD_STREAMERS_ERROR;
	constructor() { }
}


// moderators
export class LoadModeratorsAction implements Action {
	type = ActionTypes.LOAD_MODERATORS;
	constructor(public payload: User[]) { }
}

export class AddModeratorAction implements Action {
	type = ActionTypes.ADD_MODERATOR;
	constructor(public payload: User) { }
}

export class RemoveModeratorAction implements Action {
	type = ActionTypes.REMOVE_MODERATOR;
	constructor(public payload: User) { }
}

export class LoadModeratorsErrorAction implements Action {
	type = ActionTypes.LOAD_MODERATORS_ERROR;
	constructor() { }
}


export type Actions
	= LoadStreamAction
	| LoadStreamersAction
	| AddStreamerAction
	| RemoveModeratorAction
	| LoadStreamersErrorAction
	| LoadModeratorsAction
	| AddModeratorAction
	| RemoveStreamerAction
	| LoadModeratorsErrorAction
	;
