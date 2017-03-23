import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { WSService } from '../../_services/ws.service';
import * as reducers from '../../_reducers';

import { PageStreamComponent } from '../components/stream/stream.component'

@Injectable()
export class StreamDeactivate implements CanDeactivate<PageStreamComponent> {
	constructor(
		private store: Store<reducers.State>,
		private ws: WSService,
	) {}

	canDeactivate(pscomp: PageStreamComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        this.ws.unsubscribeFromStream(+route.params['id']);
		return of(true);
	}
}
