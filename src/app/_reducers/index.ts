import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromStream from './stream';
import * as fromStreams from './streams';


export interface State {
	stream: fromStream.State;
	streams: fromStreams.State;
	router: fromRouter.RouterState;
}


const reducers = {
	stream: fromStream.reducer,
	streams: fromStreams.reducer,
	router: fromRouter.routerReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	if (process.env.NODE_ENV == "production") {
		return productionReducer(state, action);
	} else {
		return developmentReducer(state, action);
	}
}


export const getStreamsState = (state: State) => state.streams;
export const getStreamsEntities = createSelector(getStreamsState, fromStreams.getEntities);
export const getStreamsIds = createSelector(getStreamsState, fromStreams.getIds);

// export const getBookEntities = createSelector(getBooksState, fromBooks.getEntities);
// export const getBookIds = createSelector(getBooksState, fromBooks.getIds);
// export const getSelectedBookId = createSelector(getBooksState, fromBooks.getSelectedId);
// export const getSelectedBook = createSelector(getBooksState, fromBooks.getSelected);
