import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
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
export class StreamEditFormComponent implements OnInit, OnChanges {
	@Input() stream: Stream
	@Input() moderators: User[]
	@Input() streamers: User[]
	@Input() isModerator: boolean

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
		(this.streamForm.controls['id'] as FormControl).setValue(this.stream.id);
		(this.streamForm.controls['title'] as FormControl).setValue(this.stream.title);
		(this.streamForm.controls['description'] as FormControl).setValue(this.stream.description);
	}

	ngOnInit(){
		
	}
}
