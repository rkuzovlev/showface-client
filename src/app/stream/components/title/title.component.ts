import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Stream } from '../../../_models/stream'

@Component({
	selector: 'stream-title',
	templateUrl: './title.component.html'
})
export class TitleComponent implements OnChanges {
	@Input() stream: Stream

	constructor() { }

	ngOnChanges(){
		console.log('TitleComponent stream', this.stream);
	}
}
