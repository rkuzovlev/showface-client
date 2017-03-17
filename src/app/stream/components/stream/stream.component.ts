import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store'

import { Observable } from 'rxjs'
import { of } from 'rxjs/observable/of'

import { Stream } from '../../../_models/stream';
import { User } from '../../../_models/user';
import * as reducers from '../../../_reducers'

@Component({
	selector: 'page-stream',
	templateUrl: './stream.component.html'
})
export class PageStreamComponent implements OnInit {
	stream$: Observable<Stream>
	moderators$: Observable<User[]>
	streamers$: Observable<User[]>

	constructor(
		private store: Store<reducers.State>
	) { }

	ngOnInit() {
		this.stream$ = this.store.select(reducers.getStreamEntity);
		this.moderators$ = this.store.select(reducers.getStreamModerators);
		this.streamers$ = this.store.select(reducers.getStreamStreamers);
	}
}
