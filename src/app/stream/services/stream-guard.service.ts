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

import { StreamService } from '../../_services/stream.service';
import * as reducers from '../../_reducers';
import * as streamsActions from '../../_actions/streams';
import * as usersActions from '../../_actions/users';
import * as streamActions from '../../_actions/stream';
import * as progressActions from '../../_actions/progress';

import { Stream } from '../../_models/stream';
import { User } from '../../_models/user';



@Injectable()
export class StreamExistsGuard implements CanActivate {
	constructor(
		private store: Store<reducers.State>,
		private streamService: StreamService,
		private router: Router
	) { }

	hasStreamInApi(id: number): Observable<Stream> {
		return this.streamService
			.getStream(id)
			.do((streamEntity) => this.store.dispatch(new streamsActions.AddStreamAction(streamEntity)))
			.do(() => this.store.dispatch(new progressActions.AddToValueAction(25)))
			.catch(() => {
				return of(null);
			});
	}

	hasStreamInStore(id: number): Observable<Stream> {
		return this.store.select(reducers.getStreamsEntities)
			.map((entities) => {
				if (entities[id] && !entities[id].closed){
					return entities[id];
				} else {
					return null;
				}
			})
			.take(1);
	}

	loadStream(id: number): Observable<Stream> {
		// return this.hasStreamInStore(id)
		// 	.switchMap(stream => {
		// 		if (stream) {
		// 			return of(stream);
		// 		}

		// 	});

		return this.hasStreamInApi(id);
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

	checkStream(id: number): Observable<boolean> {
		this.store.dispatch(new progressActions.SetValueAction(25));

		return forkJoin(
			this.loadStream(id),
			this.loadStreamers(id),
			this.loadModerators(id),
			(stream: Stream, streamers: User[], moderators: User[]): boolean => {
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

				return true;
			}
		)
	}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.checkStream(+route.params['id']);
	}
}
