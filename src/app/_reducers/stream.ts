import { createSelector } from 'reselect';

import { Stream } from '../_models/stream';
import { Comment } from '../_models/comment';
import { ChatMessage } from '../_models/chatMessage';

import * as book from '../_actions/streams';
// import * as collection from '../actions/collection';

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

export function reducer(state = initialState, action: book.Actions): State {
	switch (action.type) {
		// case collection.ActionTypes.LOAD_SUCCESS: {
			
		//	 return {};
		// }

		default: {
			return state;
		}
	}
}