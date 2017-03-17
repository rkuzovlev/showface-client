import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { User } from '../../../_models/user'


@Component({
	selector: 'stream-streamers',
	templateUrl: './streamers.component.html'
})
export class StreamersComponent {
	@Input() streamers: User[]
	@Input() canEdit: boolean

	editing: boolean = false 

	constructor() { }

	edit(){
		this.editing = true;
	}

	editDone(){
		this.editing = false;
	}
}
