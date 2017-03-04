import { createSelector } from 'reselect';
import { Stream } from '../_models/Stream';
import * as streams from '../_actions/streams';

export interface StreamEntities {
	[id: number]: Stream;
}

export interface State {
	ids: number[];
	entities: StreamEntities;
};

export const initialState: State = {
	ids: [],
	entities: {}
};

export function reducer(state = initialState, action: streams.Actions): State {
	switch (action.type) {
		case streams.ActionTypes.LOAD_SUCCESS: {
			const streams = action.payload as Stream[];
			const newStreams = streams.filter(stream => !state.entities[stream.id]);

			const newStreamIds = newStreams.map(stream => stream.id);
			const newStreamEntities = newStreams.reduce((entities: StreamEntities, stream: Stream) => {
				return Object.assign(entities, {
					[stream.id]: stream
				});
			}, {});

			return {
				ids: [ ...state.ids, ...newStreamIds ],
				entities: Object.assign({}, state.entities, newStreamEntities)
			};
		}

		// case book.ActionTypes.LOAD: {
		//	 const book = action.payload;

		//	 if (state.ids.indexOf(book.id) > -1) {
		//		 return state;
		//	 }

		//	 return {
		//		 ids: [ ...state.ids, book.id ],
		//		 entities: Object.assign({}, state.entities, {
		//			 [book.id]: book
		//		 }),
		//		 selectedBookId: state.selectedBookId
		//	 };
		// }

		// case book.ActionTypes.SELECT: {
		//	 return {
		//		 ids: state.ids,
		//		 entities: state.entities,
		//		 selectedBookId: action.payload
		//	 };
		// }

		default: {
			return state;
		}
	}
}


export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
	return ids.map(id => entities[id]);
});
