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

import { StreamService } from './stream.service';
import * as reducers from '../../_reducers';
import * as streams from '../../_actions/streams';
import { LoadStreamAction } from '../../_actions/stream'



@Injectable()
export class StreamExistsGuard implements CanActivate {
	constructor(
		private store: Store<reducers.State>,
		private streamService: StreamService,
		private router: Router
	) { }

	hasStreamInApi(id: number): Observable<boolean> {
		return this.streamService
			.getStream(id)
			.map((streamEntity) => new streams.AddStreamAction(streamEntity))
			.do((action) => this.store.dispatch(action))
			.map((action) => !!action)
			.catch(() => {
				return of(false);
			});
	}

	hasStreamInStore(id: number): Observable<boolean> {
		return this.store.select(reducers.getStreamsEntities)
			.map((entities) => !!entities[id] && !entities[id].closed)
			.take(1);
	}

	hasStream(id: number): Observable<boolean> {
		return this.hasStreamInStore(id)
			.switchMap(inStore => {
				if (inStore) {
					return of(inStore);
				}

				return this.hasStreamInApi(id);
			});
	}

	checkStream(id: number): Observable<boolean> {
		return this.hasStream(id).do((streamIsFound) => { 

			// if stream is found, we need to dispatch LoadStreamAction
			if (streamIsFound){ 
				this.store.dispatch(new LoadStreamAction(id));
			} else {
				this.router.navigate(['/404'])
			}
		});
	}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		const id = +route.params['id'];
		return this.checkStream(id);
	}
}
