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
import { Store } from '@ngrx/store';

import { StreamService } from '../_services/stream.service';
import * as streamsActions from '../_actions/streams';
import * as streamActions from '../_actions/stream';
import * as userActions from '../_actions/user';
import * as usersActions from '../_actions/users';
import { User } from '../_models/user';
import { Stream } from '../_models/stream';
import { ChatMessage } from '../_models/chat-message';
import * as reducers from '../_reducers';


@Injectable()
export class StreamEffects {
	currentStream: number = 0;

	constructor(
		private actions$: Actions, 
		private streamService: StreamService,
		private store: Store<reducers.State>,
	){
		this.store.select(reducers.getStreamId).subscribe((id) => {
			this.currentStream = id;
		});
	}

	@Effect()
	chatNewMessage$: Observable<Action> = this.actions$
		.ofType(streamActions.ActionTypes.CHAT_NEW_MESSAGE)
		.map((action: streamActions.ChatNewMessageAction) => action.payload)
		.switchMap((message: string) => {
			if (!this.currentStream){
				return empty();
			}
			
			return this.streamService.chatNewMessage(this.currentStream, message)
				.switchMap(() => empty())
				.catch((err) => of(new streamActions.ChatNewMessageErrorAction(err)));
		});

	@Effect()
	saveStream$: Observable<Action> = this.actions$
		.ofType(streamsActions.ActionTypes.SAVE_STREAM)
		.map((action: streamsActions.SaveStreamAction) => action.payload)
		.switchMap((stream: Stream) => {
			return this.streamService.putStream(stream)
				.mergeMap((stream: Stream) => [
					new streamsActions.AddStreamAction(stream),
					new streamsActions.SaveStreamSuccessAction(stream)
				])
				.catch((err) => of(new streamsActions.SaveStreamErrorAction(stream, err)));
		});



	@Effect()
	openStream$: Observable<Action> = this.actions$
		.ofType(streamsActions.ActionTypes.OPEN_STREAM)
		.map((action: streamsActions.OpenStreamAction) => action.payload)
		.switchMap((streamId: number) => {
			return this.streamService.openStream(streamId)
				.map(() => new streamsActions.OpenStreamSuccessAction(streamId))
				.catch((err) => of(new streamsActions.OpenStreamErrorAction(streamId, err)));
		});



	@Effect()
	closeStream$: Observable<Action> = this.actions$
		.ofType(streamsActions.ActionTypes.CLOSE_STREAM)
		.map((action: streamsActions.CloseStreamAction) => action.payload)
		.switchMap((streamId: number) => {
			return this.streamService.closeStream(streamId)
				.map(() => new streamsActions.CloseStreamSuccessAction(streamId))
				.catch((err) => of(new streamsActions.CloseStreamErrorAction(streamId, err)));
		});
}