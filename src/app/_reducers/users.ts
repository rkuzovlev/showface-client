import { createSelector } from 'reselect';
import { User } from '../_models/user';
import * as users from '../_actions/users';

export interface UserEntities {
	[id: number]: User;
}

export interface State {
	ids: number[];
	entities: UserEntities;
};

export const initialState: State = {
	ids: [],
	entities: {}
};

export function reducer(state = initialState, action: users.Actions): State {
	switch (action.type) {
		case users.ActionTypes.ADD_USERS: {
			const _users = action.payload as User[];
			const newUsers = _users.filter(user => !state.entities[user.id]);

			const newUserIds = newUsers.map(user => user.id);
			const newUserEntities = newUsers.reduce((entities: UserEntities, user: User) => {
				return Object.assign(entities, {
					[user.id]: user
				});
			}, {});

			const storeDif = {
				ids: [ ...state.ids, ...newUserIds ],
				entities: Object.assign({}, state.entities, newUserEntities)
			};

			return Object.assign({}, storeDif)
		}

		case users.ActionTypes.ADD_USER: {
			const user = action.payload as User;

			var storeDif = {
				ids: [ ...state.ids ],
				entities: Object.assign({}, state.entities, { [user.id]: user })
			};

			if (state.ids.indexOf(user.id) == -1){
				storeDif.ids.push(user.id);
			}

			return Object.assign({}, storeDif)
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
