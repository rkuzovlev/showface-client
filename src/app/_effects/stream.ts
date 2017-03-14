import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { StreamService } from '../_services/stream.service';
import * as streamsActions from '../_actions/streams';
import * as streamActions from '../_actions/stream';
import * as userActions from '../_actions/user';
import * as usersActions from '../_actions/users';
import { User } from '../_models/user';
import { Stream } from '../_models/stream';


@Injectable()
export class StreamEffects {
	constructor(
		private actions$: Actions, 
		private streamService: StreamService,
	){}

	@Effect()
	saveStream$: Observable<Action> = this.actions$
		.ofType(streamActions.ActionTypes.SAVE_STREAM)
		.do(() => console.log('Effect saveStream$'))
		.map((action: streamActions.SaveStreamAction) => action.payload)
		.switchMap((stream: Stream) => {
			return this.streamService.putStream(stream)
				.mergeMap((stream: Stream) => [
					new streamsActions.AddStreamAction(stream),
					new streamActions.SaveStreamSuccessAction()
				])
				.catch((err) => of(new streamActions.SaveStreamErrorAction(err)));
		});
}