import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
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
export class StreamEditFormComponent implements OnInit, OnChanges {
	@Input() stream: Stream
	@Input() moderators: User[]
	@Input() streamers: User[]
	@Input() isModerator: boolean
	@Input() streamSaveState: StreamSaveState

	@Output() saveStream = new EventEmitter<Stream>();
	@Output() closeStream = new EventEmitter<number>();
	@Output() openStream = new EventEmitter<number>();

	public streamForm: FormGroup

	constructor(
		private fb: FormBuilder
	) {
		this.streamForm = this.fb.group({
			id: ['', [Validators.required]],
			title: ['', [Validators.required]],
			description: ['', [Validators.required]]
		});

		var title: FormControl = this.streamForm.controls['title'] as FormControl;

		setInterval(() => {
			title.setValue(Math.trunc(Math.random() * 100));
		}, 1000);

		console.log('this.streamForm.controls', this.streamForm.controls['id']);
	}

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

	ngOnChanges(){
		console.log('stream', this.stream);
		console.log('moderators', this.moderators);
		console.log('streamers', this.streamers);
		console.log('isModerator', this.isModerator);
		console.log('streamSaveState', this.streamSaveState);

		// if (this.stream){

		// 	this.streamForm.patchValue({
		// 		id: this.stream.id,
		// 		title: this.stream.title,
		// 		description: this.stream.description
		// 	});
		// }
	}

	ngOnInit(){
		
	}
}
