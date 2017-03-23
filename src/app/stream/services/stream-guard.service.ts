import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { WSService } from '../../_services/ws.service';
import { StreamService } from '../../_services/stream.service';
import * as reducers from '../../_reducers';
import * as userReducer from '../../_reducers/user';
import * as streamsActions from '../../_actions/streams';
import * as usersActions from '../../_actions/users';
import * as streamActions from '../../_actions/stream';
import * as progressActions from '../../_actions/progress';

import { Stream } from '../../_models/stream';
import { User } from '../../_models/user';



@Injectable()
export class StreamGuard implements CanActivate {
	currentUser$: Observable<userReducer.UserState>

	constructor(
		private store: Store<reducers.State>,
		private streamService: StreamService,
		private router: Router,
		private ws: WSService,
	) {
		this.currentUser$ = this.store.select(reducers.getUserCurrentWithLoginState).take(1);
}

	loadStream(id: number): Observable<Stream> {
		return this.streamService
			.getStream(id)
			.do((streamEntity) => this.store.dispatch(new streamsActions.AddStreamAction(streamEntity)))
			.do(() => this.store.dispatch(new progressActions.AddToValueAction(25)))
			.catch(() => {
				return of(null);
			});
	}

	loadModerators(id: number): Observable<User[]> {
		return this.streamService
			.getStreamModerators(id)
			.do((userEntities) => this.store.dispatch(new usersActions.AddUsersAction(userEntities)))
			.do(() => this.store.dispatch(new progressActions.AddToValueAction(25)))
			.catch(() => {
				return of(null);
			});
	}

	loadStreamers(id: number): Observable<User[]> {
		return this.streamService
			.getStreamStreamers(id)
			.do((userEntities) => this.store.dispatch(new usersActions.AddUsersAction(userEntities)))
			.do(() => this.store.dispatch(new progressActions.AddToValueAction(25)))
			.catch(() => {
				return of(null);
			});
	}

	checkStream(id: number, forEditPage: boolean): Observable<boolean> {
		this.store.dispatch(new progressActions.SetValueAction(25));

		return forkJoin(
			this.loadStream(id),
			this.loadStreamers(id),
			this.loadModerators(id),
			this.currentUser$,
			(stream: Stream, streamers: User[], moderators: User[], currentUser: userReducer.UserState): boolean => {
				this.store.dispatch(new progressActions.CompleteAction());

				if (!stream){
					this.router.navigate(['/404'])
					return false;
				}

				this.store.dispatch(new streamActions.LoadStreamAction(stream));
				
				if (streamers){
					this.store.dispatch(new streamActions.LoadStreamersAction(streamers));
				} else {
					this.store.dispatch(new streamActions.LoadStreamersErrorAction());
				}

				if (moderators){
					this.store.dispatch(new streamActions.LoadModeratorsAction(moderators));
				} else {
					this.store.dispatch(new streamActions.LoadModeratorsErrorAction());
				}

				if (!forEditPage){
					this.ws.subscribeToStream(stream.id);
					return true;
				} 

				if (currentUser.login.state == userReducer.LoginState.Unauthorized){
					this.router.navigate(['/404']);
					return false;
				}

				if (currentUser.login.state != userReducer.LoginState.Logined){
					this.router.navigate(['/404']);
					return false;
				}

				if (currentUser.user.moderator){
					this.ws.subscribeToStream(stream.id);
					return true;
				}

				var isModerator = moderators.some((u) => u.id == currentUser.user.id);
				var isStreamer = streamers.some((u) => u.id == currentUser.user.id);
				
				if (isModerator || isStreamer){
					this.ws.subscribeToStream(stream.id);
					return true;
				}

				this.router.navigate(['/404']);
				return false;
			}
		)
	}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.checkStream(+route.params['id'], !!route.data['edit']);
	}
}
