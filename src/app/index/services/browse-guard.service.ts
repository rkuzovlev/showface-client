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
import * as browseActions from '../../_actions/browse';
import * as progressActions from '../../_actions/progress';

import { Stream } from '../../_models/stream';
import { User } from '../../_models/user';



@Injectable()
export class LoadBrowseStreamsGuard implements CanActivate {
	constructor(
		private store: Store<reducers.State>,
		private streamService: StreamService,
		private router: Router
	) { }


	loadStreams(): Observable<boolean> {
		this.store.dispatch(new progressActions.SetValueAction(50));

		return this.streamService
			.getBrowseStreams()
			.map((streams) => {
				this.store.dispatch(new progressActions.CompleteAction());
				this.store.dispatch(new streamsActions.LoadSuccessAction(streams));
				this.store.dispatch(new browseActions.LoadSuccessAction(streams));

				return true;
			}).catch(() => {
				this.store.dispatch(new progressActions.CompleteAction());
				return of(true);
			});
	}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.loadStreams();
	}
}
