import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { Stream } from '../_models/stream';
import { User } from '../_models/user';

import * as fromStream from './stream';
import * as fromStreams from './streams';
import * as fromUsers from './users';
import * as fromUser from './user';
import * as fromProgress from './progress';
import * as fromBrowse from './browse';
import * as fromWS from './ws';


export interface State {
	stream: fromStream.State;
	streams: fromStreams.State;
	browse: fromBrowse.State;
	users: fromUsers.State;
	user: fromUser.State;
	progress: fromProgress.State;
	ws: fromWS.State;
	router: fromRouter.RouterState;
}


const reducers = {
	stream: fromStream.reducer,
	streams: fromStreams.reducer,
	browse: fromBrowse.reducer,
	users: fromUsers.reducer,
	user: fromUser.reducer,
	progress: fromProgress.reducer,
	ws: fromWS.reducer,
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


export const getProgressState = (state: State) => state.progress;
export const getProgressValue = createSelector(getProgressState, fromProgress.getValue);
export const getProgressIsShow = createSelector(getProgressState, fromProgress.isShow);


export const getUsersState = (state: State) => state.users;
export const getUsersEntities = createSelector(getUsersState, fromUsers.getEntities);
export const getUsersIds = createSelector(getUsersState, fromUsers.getIds);


export const getUserState = (state: State) => state.user;
export const getUserCurrentId = createSelector(getUserState, fromUser.getUserId);
export const getUserLoginState = createSelector(getUserState, fromUser.getLogin);
export const getUserCurrent = createSelector(getUserCurrentId, getUsersEntities, (userId, users) => users[userId]);
export const getUserCurrentWithLoginState = createSelector(getUserCurrent, getUserLoginState, (user, login) => {
	let us: fromUser.UserState = { user, login };
	return us;
});


export const getStreamsState = (state: State) => state.streams;
export const getStreamsEntities = createSelector(getStreamsState, fromStreams.getEntities);
export const getStreamsIds = createSelector(getStreamsState, fromStreams.getIds);
export const getStreamsNonClosedEntities = createSelector(getStreamsState, fromStreams.getNonClosedEntites);


export const getStreamState = (state: State) => state.stream;
export const getStreamId = createSelector(getStreamState, fromStream.getId);
export const getStreamEntity = createSelector(getStreamsEntities, getStreamId, (entities, id) => entities[id]);
export const getStreamStreamerIds = createSelector(getStreamState, fromStream.getStreamerIds);
export const getStreamStreamers = createSelector(getUsersEntities, getStreamStreamerIds, (users, streamerIds) => streamerIds.map(id => users[id]));
export const getStreamModeratorIds = createSelector(getStreamState, fromStream.getModeratorIds);
export const getStreamModerators = createSelector(getUsersEntities, getStreamModeratorIds, (users, moderatorIds) => moderatorIds.map(id => users[id]));
const getStreamChatIds = createSelector(getStreamState, fromStream.getChatIds);
const getStreamChatMsg = createSelector(getStreamState, fromStream.getChatMessages);
export const getStreamChatMessages = createSelector(getStreamChatIds, getStreamChatMsg, (ids, messages) => {
	return ids.map((id) => messages[id]);
});

export const getStreamCanEdit = createSelector(
	getUserCurrent, 
	getUserLoginState,
	getStreamModerators,
	getStreamStreamers,
	(user: User, loginState: fromUser.LoginInterface, moderators: User[], streamers: User[]) => {
		if (loginState.state != fromUser.LoginState.Logined){
			return false;
		}

		if (user.moderator){
			return true;
		}

		var isModerator = moderators.some((u) => u.id == user.id);
		var isStreamer = streamers.some((u) => u.id == user.id);
		
		if (isModerator || isStreamer){
			return true;
		}

		return false;
	}
)

export const getBrowseState = (state: State) => state.browse;
export const getBrowseIds = createSelector(getBrowseState, fromBrowse.getIds);
export const getBrowseStreams = createSelector(getBrowseIds, getStreamsEntities, (ids, streams) => ids.map(id => streams[id]));

export const getWSState = (state: State) => state.ws;
export const getWSStatus = createSelector(getWSState, fromWS.getStatus);
