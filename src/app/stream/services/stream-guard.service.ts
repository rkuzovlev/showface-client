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


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class BookExistsGuard implements CanActivate {
	constructor(
		private store: Store<reducers.State>,
		private streamService: StreamService,
		private router: Router
	) { }

	// waitForCollectionToLoad(): Observable<boolean> {
	// 	return this.store.select(reducers.getCollectionLoaded)
	// 		.filter(loaded => loaded)
	// 		.take(1);
	// }

	// hasBookInStore(id: number): Observable<boolean> {
	// 	return this.store.select(reducers.getBookEntities)
	// 		.map(entities => !!entities[id])
	// 		.take(1);
	// }

	// hasBookInApi(id: number): Observable<boolean> {
	// 	return this.googleBooks.retrieveBook(id)
	// 		.map(bookEntity => new book.LoadAction(bookEntity))
	// 		.do((action: book.LoadAction) => this.store.dispatch(action))
	// 		.map(book => !!book)
	// 		.catch(() => {
	// 			this.router.navigate(['/404']);
	// 			return of(false);
	// 		});
	// }

	hasStreamInStore(id: number): Observable<boolean> {
		return this.store.select(reducers.getStreamsEntities)
			.map((entities) => { !!entities[id] })
			.take(1);
	}

	hasStream(id: number): Observable<boolean> {
		return this.hasStreamInStore(id)
			.switchMap(inStore => {
				if (inStore) {
					return of(inStore);
				}

				return this.hasBookInApi(id);
			});
	}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.hasStream(+route.params['id']);
	}
}
