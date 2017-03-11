import { CommonModule }     from '@angular/common';
import { NgModule } 		from '@angular/core';
import { FormsModule } 		from '@angular/forms';
import { HttpModule } 		from '@angular/http';
import { RouterModule } 	from '@angular/router';

import { StreamCardBigComponent }	from './_components/stream-card-big/stream-card-big.component';

import { ApiService } 			from "./_services/api.service";


@NgModule({
	declarations: [
		StreamCardBigComponent,
	],
	imports: [
		RouterModule,
		CommonModule,
		FormsModule,
		HttpModule,
	],
	exports: [
		StreamCardBigComponent,
	],
	providers: [
		ApiService,
	],
	bootstrap: []
})
export class SharedModule { }
