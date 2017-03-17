import { CommonModule }     from '@angular/common';
import { NgModule } 		from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } 		from '@angular/http';
import { RouterModule } 	from '@angular/router';

import { StreamCardBigComponent }	from './_components/stream-card-big/stream-card-big.component';
import { UserCardSmallComponent }	from './_components/user-card-small/user-card-small.component';

import { ApiService } 			from "./_services/api.service";


@NgModule({
	declarations: [
		StreamCardBigComponent,
		UserCardSmallComponent,
	],
	imports: [
		RouterModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
	],
	exports: [
		StreamCardBigComponent,
		UserCardSmallComponent,
	],
	providers: [
		ApiService,
	],
	bootstrap: []
})
export class SharedModule { }
