import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ModalWindowService } from "../../_services/modal-window.service";
import { Modal, ModalType } from "../../_models/modal";
import { User } from "../../_models/user";
import * as reducers from '../../_reducers';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html'
})
export class NavComponent {
	@Input() user: User
	@Output() logout = new EventEmitter();

	constructor(
		// TODO: refactor this to state
		private modalWindowService: ModalWindowService,
	){}
	
	showLoginModal(){
		// TODO: refactor this to state
		this.modalWindowService.show( new Modal(ModalType.Login) );
	}
}
