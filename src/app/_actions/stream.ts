import { Action } from '@ngrx/store';
import { Stream } from '../_models/stream';
import { User } from '../_models/user';
import { type } from '../utils';
import { ChatMessage } from '../_models/chat-message';

export const ActionTypes = {	
	LOAD_STREAM: 			type('[Stream] Load stream'),
	
	LOAD_STREAMERS: 		type('[Stream] Load streamers'),
	LOAD_STREAMERS_ERROR: 	type('[Stream] Load streamers error'),

	ADD_STREAMER: 			type('[Stream] Add streamer'),
	REMOVE_STREAMER: 		type('[Stream] Remove streamer'),
	
	LOAD_MODERATORS: 		type('[Stream] Load moderators'),
	LOAD_MODERATORS_ERROR: 	type('[Stream] Load moderators error'),
	ADD_MODERATOR: 			type('[Stream] Add moderator'),
	REMOVE_MODERATOR: 		type('[Stream] Remove moderator'),

	CHAT_ADD_MESSAGE: 		type('[Chat] Add message'),
	CHAT_REMOVE_MESSAGE: 	type('[Chat] Remove message'),
	CHAT_NEW_MESSAGE: 		type('[Chat] New message'),
	CHAT_NEW_MESSAGE_ERROR:	type('[Chat] New message error'),
	CHAT_NEW_MESSAGE_COMPLETE:	type('[Chat] New message complete'),
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



// chat
export class ChatAddMessageAction implements Action {
	type = ActionTypes.CHAT_ADD_MESSAGE;
	constructor(public payload: ChatMessage){}
}

export class ChatRemoveMessageAction implements Action {
	type = ActionTypes.CHAT_REMOVE_MESSAGE;
	constructor(public payload: number){}
}

export class ChatNewMessageAction implements Action {
	type = ActionTypes.CHAT_NEW_MESSAGE;
	constructor(public payload: string){}
}

export class ChatNewMessageErrorAction implements Action {
	type = ActionTypes.CHAT_NEW_MESSAGE_ERROR;
	constructor(public payload: Error){}
}

export class ChatNewMessageCompleteAction implements Action {
	type = ActionTypes.CHAT_NEW_MESSAGE_COMPLETE;
	constructor(){}
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
	| ChatAddMessageAction
    | ChatRemoveMessageAction
	| ChatNewMessageAction
	| ChatNewMessageErrorAction
	| ChatNewMessageCompleteAction
	;
