import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
export class StreamEditFormComponent implements OnInit {
	@Input() stream: Stream
	@Input() moderators: User[]
	@Input() streamers: User[]
	@Input() isModerator: boolean

	@Output() saveStream = new EventEmitter();

	public streamForm: FormGroup

	constructor(
		private fb: FormBuilder
	) { }

	save(){
		if (!this.streamForm.valid){
			return;
		}

		console.log(this.stream, this.streamForm.value);

		// for (let f in this.streamForm.value){
		// 	if (this.streamForm.value.hasOwnProperty(f)){
		// 		this.stream[f] = this.streamForm.value[f];
		// 	}
		// }

		// this.saveStream.emit(this.stream);
	}

	ngOnInit(){
		this.streamForm = this.fb.group({
			id: [this.stream.id, [Validators.required]],
			title: [this.stream.title, [Validators.required]],
			description: [this.stream.description, [Validators.required]]
		});
	}
}
