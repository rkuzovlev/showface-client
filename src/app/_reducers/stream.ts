import { createSelector } from 'reselect';

import { Stream } from '../_models/stream';
import { Comment } from '../_models/comment';
import { ChatMessage } from '../_models/chatMessage';

import * as stream from '../_actions/stream';

import { State as ChatState, initialState as ChatInitialState } from './chat'


export interface State {
	id: number;
	streamerIds: number[];
	moderatorIds: number[];
	comments: Comment[];
	chat: ChatState;
};

export const initialState: State = {
	id: 0,
	streamerIds: [],
	moderatorIds: [],
	comments: [],
	chat: ChatInitialState,
};

export function reducer(state = initialState, action: stream.Actions): State {
	switch (action.type) {
		case stream.ActionTypes.LOAD_STREAM: {
			const streamId = action.payload as number;

			return Object.assign({}, state, {id: streamId});
		}

		default: {
			return state;
		}
	}
}


export const getId = (state: State) => state.id;
