import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromStream from './stream';
import * as fromStreams from './streams';
import * as fromUsers from './users';
import * as fromUser from './user';


export interface State {
	stream: fromStream.State;
	streams: fromStreams.State;
	users: fromUsers.State;
	router: fromRouter.RouterState;
}


const reducers = {
	stream: fromStream.reducer,
	streams: fromStreams.reducer,
	users: fromUsers.reducer,
	user: fromUser.reducer,
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


export const getUsersState = (state: State) => state.users;
export const getUsersEntities = createSelector(getUsersState, fromUsers.getEntities);
export const getUsersIds = createSelector(getUsersState, fromUsers.getIds);


export const getStreamsState = (state: State) => state.streams;
export const getStreamsEntities = createSelector(getStreamsState, fromStreams.getEntities);
export const getStreamsIds = createSelector(getStreamsState, fromStreams.getIds);
export const getStreamsNonClosedEntities = createSelector(getStreamsState, fromStreams.getNonClosedEntites);


export const getStreamState = (state: State) => state.stream;
export const getStreamId = createSelector(getStreamState, fromStream.getId);
export const getStreamEntity = createSelector(getStreamsEntities, getStreamId, (entities, id) => {
	return entities[id]
});

export const getStreamStreamerIds = createSelector(getStreamState, fromStream.getStreamerIds);
export const getStreamStreamers = createSelector(getUsersEntities, getStreamStreamerIds, (users, streamerIds) => {
	return streamerIds.map(id => users[id]);
});

export const getStreamModeratorIds = createSelector(getStreamState, fromStream.getModeratorIds);
export const getStreamModerators = createSelector(getUsersEntities, getStreamModeratorIds, (users, moderatorIds) => {
	return moderatorIds.map(id => users[id]);
});
