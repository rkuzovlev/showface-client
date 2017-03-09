import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as reducers from '../../_reducers';
import { LoginAction, LoginType } from '../../_actions/user';


@Component({
	selector: 'login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	constructor(
		private store: Store<reducers.State>,
	) { }

	loginFB(){
		this.store.dispatch(new LoginAction(LoginType.Facebook));
	}
}
