import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	CanActivate, Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivateChild
} from '@angular/router';

import * as reducers from '../_reducers';
import * as userActions from '../_actions/user';

@Injectable()
export class LoadTokenGuard implements CanActivate, CanActivateChild {
	isLoaded: boolean = false;

	constructor(
		private store: Store<reducers.State>,
	) {}

	loadToken(){
		if (this.isLoaded){
			return;
		}
		this.isLoaded = true;
		this.store.dispatch(new userActions.LoadTokenAction());
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		this.loadToken();
		return true;
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		this.loadToken();
		return true;
	}
}