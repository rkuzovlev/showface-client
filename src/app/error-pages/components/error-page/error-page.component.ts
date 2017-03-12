import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'error-page',
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent {
	text: string;
	status: number;

	constructor(
		private route: ActivatedRoute
	){
		this.text = route.snapshot.data['text'];
		this.status = route.snapshot.data['status'];
	}
}
