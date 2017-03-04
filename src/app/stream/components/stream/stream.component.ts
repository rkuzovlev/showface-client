import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Stream } from '../../../_models/Stream';


@Component({
	selector: 'page-stream',
	templateUrl: './stream.component.html'
})
export class PageStreamComponent implements OnInit {
	stream: Stream
	
	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		this.route.data
			.subscribe((data: { stream: Stream }) => {
				this.stream = data.stream;
			});
	}
}
