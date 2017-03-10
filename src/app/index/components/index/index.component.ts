import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as reducers from '../../../_reducers'
import { Stream } from '../../../_models/stream';

@Component({
  selector: 'page-index',
  templateUrl: './index.component.html'
})
export class PageIndexComponent implements OnInit {
	streams$: Observable<Stream[]>

	constructor(
		private store: Store<reducers.State>
	) { }

	ngOnInit() {
		this.streams$ = this.store.select(reducers.getBrowseStreams);
	}
}
