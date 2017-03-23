import { createSelector } from 'reselect';
import * as wsActions from '../_actions/ws';

export interface State {
	status: wsActions.Statuses;
};

export const initialState: State = {
	status: wsActions.Statuses.Disconnected
};

export function reducer(state = initialState, action: wsActions.Actions): State {
	switch (action.type) {
		case wsActions.ActionTypes.CHANGE_STATUS: {
			const status = action.payload as wsActions.Statuses;

			return Object.assign({}, state, { status: status });
		}


		default: {
			return state;
		}
	}
}

export const getStatus = (state: State) => state.status;