import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store'

import { Observable } from 'rxjs'
import { of } from 'rxjs/observable/of'

import { Stream } from '../../../_models/stream';
import { User } from '../../../_models/user';
import * as reducers from '../../../_reducers'

@Component({
	selector: 'stream-edit-form',
	templateUrl: './stream-edit-form.component.html'
})
export class StreamEditFormComponent {
	@Input() stream: Stream
	@Input() moderators: User[]
	@Input() streamers: User[]

	constructor() { }
}
