import { createSelector } from 'reselect';
import { ChatMessage } from '../_models/chat-message';
import * as stream from '../_actions/stream';

export interface ChatEntities {
	[id: number]: ChatMessage;
}

export interface State {
	ids: number[];
	messages: ChatEntities;
};

export const initialState: State = {
	ids: [],
	messages: {}
};

export function reducer(state = initialState, action: stream.Actions): State {
	switch (action.type) {
		case stream.ActionTypes.CHAT_ADD_MESSAGE: {
			const msg = action.payload as ChatMessage;
			
			if (state.ids.indexOf(msg.id) != -1){
				return state;
			}

			let ids = [ ...state.ids, msg.id ];
			let messages = Object.assign({}, state.messages, {[msg.id]: msg});

			return Object.assign({}, state, { ids, messages });
		}

		case stream.ActionTypes.CHAT_REMOVE_MESSAGE: {
			const msgId = action.payload as number;
			
			let i = state.ids.indexOf(msgId);
			if (i == -1){
				return state;
			}

			let ids = [ 
				...state.ids.slice(0, i),
				...state.ids.slice(i + 1)
			];
			let messages = Object.assign({}, state.messages);
			delete messages[msgId];

			return Object.assign({}, state, { ids, messages });
		}

		default: {
			return state;
		}
	}
}