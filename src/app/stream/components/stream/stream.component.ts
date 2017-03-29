import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

import { Stream } from '../../../_models/stream';
import { ChatMessage } from '../../../_models/chat-message';
import { User } from '../../../_models/user';
import * as reducers from '../../../_reducers';
import * as userReducers from '../../../_reducers/user';
import * as streamActions from '../../../_actions/stream';

@Component({
	selector: 'page-stream',
	templateUrl: './stream.component.html'
})
export class PageStreamComponent implements OnInit, OnDestroy {
	stream$: Observable<Stream>
	moderators$: Observable<User[]>
	streamers$: Observable<User[]>
	messages$: Observable<ChatMessage[]>
	currentUser$: Observable<User>
	canEdit$: Observable<boolean>

	constructor(
		private store: Store<reducers.State>
	) { }

	ngOnInit() {
		this.stream$ = this.store.select(reducers.getStreamEntity);
		this.moderators$ = this.store.select(reducers.getStreamModerators);
		this.streamers$ = this.store.select(reducers.getStreamStreamers);
		this.messages$ = this.store.select(reducers.getStreamChatMessages);
		this.currentUser$ = this.store.select(reducers.getUserCurrent);
		this.canEdit$ = this.store.select(reducers.getStreamCanEdit);
	}

	newMessage(message: string){
		this.store.dispatch(new streamActions.ChatNewMessageAction(message));
	}

	ngOnDestroy() {

	}
}
