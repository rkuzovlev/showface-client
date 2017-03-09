import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as reducers from '../../_reducers';
import * as userActions from '../../_actions/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
	title = 'app works!';

	constructor(
		private store: Store<reducers.State>,
	) { 
		store.dispatch(new userActions.LoadTokenAction());
		store.subscribe(function(state) {
			console.log('state', state);
		})
	}
}
