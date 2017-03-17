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
		case streams.ActionTypes.CLOSE_STREAM: {
			const streamId = action.payload as number;

			if (!state.entities[streamId]){
				console.warn(`reducer streams.ActionTypes.CLOSE_STREAM has not stream ${streamId} in stream list`);
				return state;
			}

			const st = Object.assign({}, state.entities[streamId], { closeInProgress: true, closeError: null });
			const newEntities = Object.assign({}, state.entities, { [streamId]: st });
			return Object.assign({}, state, {entities: newEntities});
		}

		case streams.ActionTypes.CLOSE_STREAM_SUCCESS: {
			const streamId = action.payload as number;

			if (!state.entities[streamId]){
				console.warn(`reducer streams.ActionTypes.CLOSE_STREAM_SUCCESS has not stream ${streamId} in stream list`);
				return state;
			}

			const st = Object.assign({}, state.entities[streamId], { closed: true, closeInProgress: false, closeError: null });
			const newEntities = Object.assign({}, state.entities, { [streamId]: st });
			return Object.assign({}, state, {entities: newEntities});
		}

		case streams.ActionTypes.CLOSE_STREAM_ERROR: {
			const openErrorPayload = action.payload as streams.StreamOpenCloseErrorPayload;
			const streamId = openErrorPayload.id;
			const _error = openErrorPayload.error;

			if (!state.entities[streamId]){
				console.warn(`reducer streams.ActionTypes.CLOSE_STREAM_ERROR has not stream ${streamId} in stream list`);
				return state;
			}

			const st = Object.assign({}, state.entities[streamId], { closeInProgress: false, closeError: _error });
			const newEntities = Object.assign({}, state.entities, { [streamId]: st });
			return Object.assign({}, state, {entities: newEntities});
		}





		case streams.ActionTypes.OPEN_STREAM: {
			const streamId = action.payload as number;

			if (!state.entities[streamId]){
				console.warn(`reducer streams.ActionTypes.OPEN_STREAM has not stream ${streamId} in stream list`);
				return state;
			}

			const st = Object.assign({}, state.entities[streamId], { openInProgress: true, openError: null });
			const newEntities = Object.assign({}, state.entities, { [streamId]: st });
			return Object.assign({}, state, {entities: newEntities});
		}

		case streams.ActionTypes.OPEN_STREAM_SUCCESS: {
			const streamId = action.payload as number;

			if (!state.entities[streamId]){
				console.warn(`reducer streams.ActionTypes.OPEN_STREAM_SUCCESS has not stream ${streamId} in stream list`);
				return state;
			}

			const st = Object.assign({}, state.entities[streamId], { closed: false, openInProgress: false, openError: null });
			const newEntities = Object.assign({}, state.entities, { [streamId]: st });
			return Object.assign({}, state, {entities: newEntities});
		}

		case streams.ActionTypes.OPEN_STREAM_ERROR: {
			const openErrorPayload = action.payload as streams.StreamOpenCloseErrorPayload;
			const streamId = openErrorPayload.id;
			const _error = openErrorPayload.error;

			if (!state.entities[streamId]){
				console.warn(`reducer streams.ActionTypes.OPEN_STREAM_ERROR has not stream ${streamId} in stream list`);
				return state;
			}

			const st = Object.assign({}, state.entities[streamId], { openInProgress: false, openError: _error });
			const newEntities = Object.assign({}, state.entities, { [streamId]: st });
			return Object.assign({}, state, {entities: newEntities});
		}



		case streams.ActionTypes.SAVE_STREAM: {
			const _stream = action.payload as Stream;

			const streamId = _stream.id;

			if (!state.entities[streamId]){
				console.warn(`reducer streams.ActionTypes.SAVE_STREAM has not stream ${streamId} in stream list`);
				return state;
			}

			const st = Object.assign({}, state.entities[streamId], { saveInProgress: true, saveError: null });
			const newEntities = Object.assign({}, state.entities, { [streamId]: st });
			return Object.assign({}, state, {entities: newEntities});
		}

		case streams.ActionTypes.SAVE_STREAM_SUCCESS: {
			const _stream = action.payload as Stream;

			const streamId = _stream.id;

			if (!state.entities[streamId]){
				console.warn(`reducer streams.ActionTypes.SAVE_STREAM_SUCCESS has not stream ${streamId} in stream list`);
				return state;
			}

			const st = Object.assign({}, state.entities[streamId], { saveInProgress: false, saveError: null });
			const newEntities = Object.assign({}, state.entities, { [streamId]: st });
			return Object.assign({}, state, {entities: newEntities});
		}

		case streams.ActionTypes.SAVE_STREAM_ERROR: {
			const saveErrorPayload = action.payload as streams.StreamSaveErrorPayload;
			const _stream = saveErrorPayload.stream;
			const _error = saveErrorPayload.error;

			const streamId = _stream.id;

			if (!state.entities[streamId]){
				console.warn(`reducer streams.ActionTypes.SAVE_STREAM_ERROR has not stream ${streamId} in stream list`);
				return state;
			}

			const st = Object.assign({}, state.entities[streamId], { saveInProgress: false, saveError: _error });
			const newEntities = Object.assign({}, state.entities, { [streamId]: st });
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