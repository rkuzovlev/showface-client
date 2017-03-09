import { createSelector } from 'reselect';
import { User } from '../_models/user';
import * as user from '../_actions/user';

export enum LoginState {
	Unauthorized = 1,
	Login,
	Logined,
	Error
}

export interface State {
	userId: number;
	login: {
		state: LoginState;
		error: Error;
		token: string;
	};
};

export const initialState: State = {
	userId: 0,
	login: {
		state: LoginState.Unauthorized,
		error: null,
		token: null
	}
};

export function reducer(state = initialState, action: user.Actions): State {
	switch (action.type) {
		case user.ActionTypes.LOGIN: {
			const login = {
				state: LoginState.Login,
				error: null,
				token: null
			};

			return Object.assign({}, state, { login: login });
		}

		case user.ActionTypes.LOGIN_SUCCESS: {
			const loginData = action.payload as user.LoginSuccess;

			const login = {
				state: LoginState.Logined,
				error: null,
				token: loginData.token
			};

			return Object.assign({}, state, { userId: loginData.user.id, login: login });
		}

		case user.ActionTypes.LOGIN_ERROR: {
			const error = action.payload as Error;

			const login = {
				state: LoginState.Error,
				error: error,
				token: null
			};

			return Object.assign({}, state, { userId: 0, login: login });
		}

		case user.ActionTypes.LOGOUT: {
			const login = {
				state: LoginState.Unauthorized,
				error: null,
				token: null
			};

			return Object.assign({}, state, { userId: 0, login: login });
		}


		default: {
			return state;
		}
	}
}

export const getUserId = (state: State) => state.userId;
export const getLogin = (state: State) => state.login;
export const getLoginState = createSelector(getLogin, (login) => login.state);
export const getLoginError = createSelector(getLogin, (login) => login.error);
export const getToken = createSelector(getLogin, (login) => login.token);