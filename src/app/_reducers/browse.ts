import { createSelector } from 'reselect';
import { Stream } from '../_models/stream';
import * as browse from '../_actions/browse';

export interface State {
	ids: number[];
};

export const initialState: State = {
	ids: []
};

export function reducer(state = initialState, action: browse.Actions): State {
	switch (action.type) {
		case browse.ActionTypes.LOAD_SUCCESS: {
			const _streams = action.payload as Stream[];

			const storeDif = {
				ids: [ ..._streams.map(stream => stream.id) ]
			};

			return Object.assign({}, state, storeDif)
		}



		case browse.ActionTypes.ADD_STREAM: {
			const stream = action.payload as Stream;

			var storeDif = {
				ids: [ ...state.ids ],
			};

			if (state.ids.indexOf(stream.id) == -1){
				storeDif.ids.push(stream.id);
			}

			return Object.assign({}, state, storeDif)
		}



		default: {
			return state;
		}
	}
}

export const getIds = (state: State) => state.ids;