import { Component, OnInit } from '@angular/core';

import { ModalWindowService } from "../../_services/modal-window.service";

import { Modal, ModalType } from "../../_models/Modal";

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
	constructor(private modalWindowService: ModalWindowService) { }

	ngOnInit() { }

	showLoginModal(){
		this.modalWindowService.show( new Modal(ModalType.Login) );
	}
}
