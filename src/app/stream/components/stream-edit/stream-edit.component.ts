import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store'

import { Observable } from 'rxjs'
import { of } from 'rxjs/observable/of'

import { Stream } from '../../../_models/stream';
import { User } from '../../../_models/user';
import * as reducers from '../../../_reducers'
import * as streamsActions from '../../../_actions/streams'


@Component({
	selector: 'page-stream-edit',
	templateUrl: './stream-edit.component.html'
})
export class PageStreamEditComponent implements OnInit {
	stream$: Observable<Stream>
	moderators$: Observable<User[]>
	streamers$: Observable<User[]>
	currentUserIsModerator$: Observable<boolean>

	constructor(
		private store: Store<reducers.State>
	) { }

	ngOnInit() {
		this.stream$ = this.store.select(reducers.getStreamEntity);
		this.moderators$ = this.store.select(reducers.getStreamModerators);
		this.streamers$ = this.store.select(reducers.getStreamStreamers);
		this.currentUserIsModerator$ = this.store.select(reducers.getUserCurrent)
			.filter(u => !!u)
			.map(u => u.moderator);
	}

	saveStream(stream: Stream){
		this.store.dispatch(new streamsActions.SaveStreamAction(stream));
	}

	closeStream(id: number){
		this.store.dispatch(new streamsActions.CloseStreamAction(id));
	}

	openStream(id: number){
		this.store.dispatch(new streamsActions.OpenStreamAction(id));
	}
}
