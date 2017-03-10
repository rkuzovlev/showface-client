import { createSelector } from 'reselect';
import * as progress from '../_actions/progress';

export interface State {
	value: number;
	show: boolean;
};

export const initialState: State = {
	value: 0,
	show: false
};

export function reducer(state = initialState, action: progress.Actions): State {
	switch (action.type) {
		case progress.ActionTypes.SET_VALUE: {
			const value: number = action.payload;
			return Object.assign({}, state, { value: value, show: true });
		}

		case progress.ActionTypes.ADD_TO_VALUE: {
			let value: number = action.payload;
			value += state.value;
			if (value > 100){
				value = 100;
			}
			return Object.assign({}, state, { value: value, show: true });
		}

		case progress.ActionTypes.COMPLETE: {
			return Object.assign({}, state, { value: 0, show: false });
		}

		default: {
			return state;
		}
	}
}

export const getValue = (state: State) => state.value;
export const isShow = (state: State) => state.show;