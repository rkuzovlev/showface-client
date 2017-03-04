import { createSelector } from 'reselect';
import { ChatMessage } from '../_models/chatMessage';
import * as book from '../_actions/streams';
// import * as collection from '../actions/collection';


export interface State {
	newMessage: string;
	messages: ChatMessage[];
};

export const initialState: State = {
	newMessage: "", 
	messages: []
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