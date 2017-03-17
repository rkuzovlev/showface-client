import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Stream } from "../../_models/stream";
import * as reducers from '../../_reducers';

@Component({
	selector: 'find-user',
	templateUrl: './find-user.component.html'
})
export class FindUserComponent {
	@Input() stream: Stream
	// @Output() logout = new EventEmitter();

	constructor(){}
}
