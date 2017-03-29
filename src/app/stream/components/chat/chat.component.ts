import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ChatMessage } from '../../../_models/chat-message';

@Component({
	selector: 'stream-chat',
	templateUrl: './chat.component.html'
})
export class ChatComponent {
	@Input() messages: ChatMessage[]

	constructor() { }
}
