import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store'

import { Observable } from 'rxjs'

import { Stream } from '../../../_models/stream';
import * as reducers from '../../../_reducers'

@Component({
	selector: 'page-stream',
	templateUrl: './stream.component.html'
})
export class PageStreamComponent implements OnInit {
	stream: Observable<Stream>

	constructor(
		private store: Store<reducers.State>
	) { }

	ngOnInit() {
		this.stream = this.store.select(reducers.getStreamEntity)
	}
}
