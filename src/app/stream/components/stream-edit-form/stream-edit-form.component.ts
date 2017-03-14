import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store'

import { Observable } from 'rxjs'
import { of } from 'rxjs/observable/of'

import { StreamSaveState } from '../../../_reducers/stream'
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
	@Input() streamSaveState: StreamSaveState

	@Output() saveStream = new EventEmitter<Stream>();

	public streamForm: FormGroup

	constructor(
		private fb: FormBuilder
	) { }

	save(){
		if (!this.streamForm.valid){
			return;
		}

		// TODO: fix this shit
		var streamForSave = new Stream(
				this.streamForm.value.title,
				this.stream.image,
				this.streamForm.value.description,
				this.stream.closed,
				this.stream.id,
				this.stream.createdAt,
				this.stream.updatedAt
			);

		this.saveStream.emit(streamForSave);
	}

	ngOnInit(){
		this.streamForm = this.fb.group({
			id: [this.stream.id, [Validators.required]],
			title: [this.stream.title, [Validators.required]],
			description: [this.stream.description, [Validators.required]]
		});
	}
}
