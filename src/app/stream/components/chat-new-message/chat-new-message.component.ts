import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

const KEY_ENTER = 13;

@Component({
	selector: 'stream-chat-new-message',
	templateUrl: './chat-new-message.component.html'
})
export class ChatNewMessageComponent {
	@Output() newMessage = new EventEmitter<string>();

	message: string = ""
	
	constructor() { }
	
	_newMessage(event: KeyboardEvent){
		if (event.keyCode != KEY_ENTER){
			return;
		}

		let msg = this.message.trim();
		if (msg != ""){
			this.newMessage.emit(msg);
			this.message = "";
		}

		event.stopPropagation();
		event.preventDefault();
	}
}
