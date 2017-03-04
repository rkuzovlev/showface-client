import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
	selector: 'stream-title',
	templateUrl: './title.component.html'
})
export class TitleComponent {
	@Input() title: string

	constructor() { }
}
