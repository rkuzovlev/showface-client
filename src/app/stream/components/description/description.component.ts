import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Stream } from '../../../_models/stream'


@Component({
	selector: 'stream-description',
	templateUrl: './description.component.html'
})
export class DescriptionComponent {
	@Input() stream: Stream
	@Input() canEdit: boolean

	constructor() { }
}
