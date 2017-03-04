import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store'

import { Stream } from '../../../_models/stream';
import * as reducers from '../../../_reducers'
import { LoadStreamAction } from '../../../_actions/stream'

@Component({
	selector: 'page-stream',
	templateUrl: './stream.component.html'
})
export class PageStreamComponent implements OnInit {
	stream: Stream
	
	constructor(
		private store: Store<reducers.State>,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.store.select(reducers.getStreamEntity)
			.subscribe((stream) => console.log('stream', stream));

		this.stream = new Stream("test title", "", "description", false, 4, new Date(), new Date())
	}

	ngOnInit() {
		this.route.params
			.subscribe((params: Params) => {
				this.store.dispatch(new LoadStreamAction(+params['id']))
			});
	}
}
