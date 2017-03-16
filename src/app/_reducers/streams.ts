import { createSelector } from 'reselect';
import { Stream } from '../_models/stream';
import * as streams from '../_actions/streams';

export interface StreamSaveState {
	saveInProgress: boolean;
	saveError: Error;
};

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
		case streams.ActionTypes.SAVE_STREAM: {
			let _stream = action.payload as Stream;

			// let st = state.entities[_stream.id];

			if (!state.entities[_stream.id]){
				return state;
			}

			_stream.saveInProgress = true;
			_stream.saveError = null;

			let newEntities = Object.assign({}, state.entities, { [_stream.id]: _stream });

			return Object.assign({}, state, {entities: newEntities});
		}

		case streams.ActionTypes.SAVE_STREAM_SUCCESS: {
			let _stream = action.payload as Stream;

			let st = state.entities[_stream.id];

			if (!st){
				return state;
			}

			st.saveInProgress = false;
			st.saveError = null;

			let newEntities = Object.assign({}, state.entities, { [_stream.id]: st });

			return Object.assign({}, state, {entities: newEntities});
		}

		case streams.ActionTypes.SAVE_STREAM_ERROR: {
			const saveErrorPayload = action.payload as streams.StreamSaveErrorPayload;
			const _stream = saveErrorPayload.stream;
			const _error = saveErrorPayload.error;

			let st = state.entities[_stream.id];

			if (!st){
				return state;
			}

			st.saveInProgress = false;
			st.saveError = _error;

			let newEntities = Object.assign({}, state.entities, { [_stream.id]: st });

			return Object.assign({}, state, {entities: newEntities});
		}


		case streams.ActionTypes.LOAD_SUCCESS: {
			const _streams = action.payload as Stream[];
			const newStreams = _streams.filter(stream => !state.entities[stream.id]);

			const newStreamIds = newStreams.map(stream => stream.id);
			const newStreamEntities = newStreams.reduce((entities: StreamEntities, stream: Stream) => {
				return Object.assign(entities, {
					[stream.id]: stream
				});
			}, {});

			const storeDif = {
				ids: [ ...state.ids, ...newStreamIds ],
				entities: Object.assign({}, state.entities, newStreamEntities)
			};

			return Object.assign({}, state, storeDif)
		}

		case streams.ActionTypes.ADD_STREAM: {
			const stream = action.payload as Stream;

			var storeDif = {
				ids: [ ...state.ids ],
				entities: Object.assign({}, state.entities, { [stream.id]: stream })
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


export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
	return ids.map(id => entities[id]);
});

export const getNonClosedEntites = createSelector(getAll, (entities) => {
	return entities.filter(entity => !entity.closed);
})