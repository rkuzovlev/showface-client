import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store'

import { Observable } from 'rxjs'
import { of } from 'rxjs/observable/of'

import { Stream } from '../../../_models/stream';
import { User } from '../../../_models/user';
import * as reducers from '../../../_reducers'
import * as userReducers from '../../../_reducers/user'

@Component({
	selector: 'page-stream',
	templateUrl: './stream.component.html'
})
export class PageStreamComponent implements OnInit, OnDestroy {
	stream$: Observable<Stream>
	moderators$: Observable<User[]>
	streamers$: Observable<User[]>
	currentUser$: Observable<User>
	canEdit$: Observable<boolean>

	constructor(
		private store: Store<reducers.State>
	) { }

	ngOnInit() {
		this.stream$ = this.store.select(reducers.getStreamEntity);
		this.moderators$ = this.store.select(reducers.getStreamModerators);
		this.streamers$ = this.store.select(reducers.getStreamStreamers);
		this.currentUser$ = this.store.select(reducers.getUserCurrent);
		this.canEdit$ = this.store.select(reducers.getStreamCanEdit);
	}

	ngOnDestroy() {

	}
}
