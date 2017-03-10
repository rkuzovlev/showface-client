import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ModalWindowService } from "../../_services/modal-window.service";
import { Modal, ModalType } from "../../_models/modal";
import { Stream } from "../../_models/stream";
import * as reducers from '../../_reducers';

@Component({
	selector: 'stream-card-big',
	templateUrl: './stream-card-big.component.html'
})
export class StreamCardBigComponent {
	@Input() stream: Stream
	// @Output() logout = new EventEmitter();

	constructor(){}
}
