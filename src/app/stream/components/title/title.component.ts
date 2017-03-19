import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Stream } from '../../../_models/stream'

@Component({
	selector: 'stream-title',
	templateUrl: './title.component.html'
})
export class TitleComponent {
	@Input() stream: Stream

	constructor() { }
}
