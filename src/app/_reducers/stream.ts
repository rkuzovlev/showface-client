import { createSelector } from 'reselect';

import { Stream } from '../_models/stream';
import { User } from '../_models/user';
import { Comment } from '../_models/comment';
import { ChatMessage } from '../_models/chatMessage';

import * as stream from '../_actions/stream';

import { State as ChatState, initialState as ChatInitialState } from './chat'


export interface StreamSaveState {
	saveInProgress: boolean;
	saveError: Error;
};

export interface State {
	id: number;
	streamerIds: number[];
	moderatorIds: number[];
	comments: Comment[];
	chat: ChatState;
	saveInProgress: boolean;
	saveError: Error;
};

export const initialState: State = {
	id: 0,
	streamerIds: [],
	moderatorIds: [],
	comments: [],
	chat: ChatInitialState,
	saveInProgress: false,
	saveError: null,
};

function addIdToIds(oldIds, newid) {
	let ids = [ ...oldIds ];

	if (ids.indexOf(newid) == -1){
		ids.push(newid);
	}

	return ids;
}

function removeIdFromIds(oldIds, id) {
	let ids = [ ...oldIds ];

	let index = ids.indexOf(id);

	if (index >= 0) {
		ids.splice(index, 1);
	}

	return ids;
}

export function reducer(state = initialState, action: stream.Actions): State {
	switch (action.type) {
		case stream.ActionTypes.SAVE_STREAM: {
			return Object.assign({}, state, {saveInProgress: true, saveError: null});
		}

		case stream.ActionTypes.SAVE_STREAM_SUCCESS: {
			return Object.assign({}, state, {saveInProgress: false, saveError: null});
		}

		case stream.ActionTypes.SAVE_STREAM_ERROR: {
			const err = action.payload as Error;
			return Object.assign({}, state, {saveInProgress: false, saveError: err});
		}




		case stream.ActionTypes.LOAD_STREAM: {
			const stream = action.payload as Stream;
			return Object.assign({}, state, {id: stream.id});
		}

		case stream.ActionTypes.LOAD_STREAMERS: {
			const users = action.payload as User[];
			let ids = users.map(l => l['id']);
			return Object.assign({}, state, {streamerIds: ids});
		}

		case stream.ActionTypes.ADD_STREAMER: {
			const user = action.payload as User;
			let ids = addIdToIds(state.streamerIds, user.id);
			return Object.assign({}, state, {streamerIds: ids});
		}

		case stream.ActionTypes.LOAD_MODERATORS: {
			const users = action.payload as User[];
			let ids = users.map(l => l['id']);
			return Object.assign({}, state, {moderatorIds: ids});
		}

		case stream.ActionTypes.ADD_MODERATOR: {
			const user = action.payload as User;
			let ids = addIdToIds(state.moderatorIds, user.id);
			return Object.assign({}, state, {moderatorIds: ids});
		}

		case stream.ActionTypes.REMOVE_STREAMER: {
			const user = action.payload as User;
			let ids = removeIdFromIds(state.streamerIds, user.id);
			return Object.assign({}, state, {streamerIds: ids});
		}

		case stream.ActionTypes.REMOVE_MODERATOR: {
			const user = action.payload as User;
			let ids = removeIdFromIds(state.moderatorIds, user.id);
			return Object.assign({}, state, {moderatorIds: ids});
		}

		default: {
			return state;
		}
	}
}


export const getId = (state: State) => state.id;
export const getModeratorIds = (state: State) => state.moderatorIds;
export const getStreamerIds = (state: State) => state.streamerIds;
export const getSaveState = (state: State) => ({saveInProgress: state.saveInProgress, saveError: state.saveError} as StreamSaveState);
