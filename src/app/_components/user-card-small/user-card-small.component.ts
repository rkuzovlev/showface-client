import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from "../../_models/user";
import * as reducers from '../../_reducers';

@Component({
	selector: 'user-card-small',
	templateUrl: './user-card-small.component.html'
})
export class UserCardSmallComponent {
	@Input() user: User
	@Input() edit: boolean = false

	@Output() delete = new EventEmitter();

	constructor(){}
}
