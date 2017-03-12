import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as reducers from '../../_reducers';
import * as userActions from '../../_actions/user';
import { User } from "../../_models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit  {
	title = 'app works!';
	user$: Observable<User>
	progressValue$: Observable<number>
	progressShow$: Observable<boolean>

	constructor(
		private store: Store<reducers.State>,
	){}

	ngOnInit() {
		this.user$ = this.store.select(reducers.getUserCurrent);
		this.progressShow$ = this.store.select(reducers.getProgressIsShow);
		this.progressValue$ = this.store.select(reducers.getProgressValue);
	}

	logout() {
		this.store.dispatch(new userActions.LogoutAction());
	}
}
