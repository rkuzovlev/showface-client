import { Component, OnInit } from '@angular/core';

import { ModalWindowService } from "../../_services/modal-window.service";

import { Modal } from "../../_models/Modal";


// right now it's regular login modal window
// will try to make some universal next time
@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
	modal: Modal
	constructor(private modalWindowService: ModalWindowService) { }

	show(modal: Modal){
		this.modal = modal;
	}

	hide(){
		this.modal = null;
	}

	ngOnInit() {
		this.modalWindowService.getObservable().subscribe((modal: Modal) => { this.show(modal) });
	}
}
