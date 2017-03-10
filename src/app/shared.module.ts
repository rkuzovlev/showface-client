import { CommonModule }     from '@angular/common';
import { NgModule } 		from '@angular/core';
import { FormsModule } 		from '@angular/forms';
import { HttpModule } 		from '@angular/http';
import { RouterModule } 	from '@angular/router';

import { StreamCardBigComponent }	from './_components/stream-card-big/stream-card-big.component';


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

	],
	bootstrap: []
})
export class SharedModule { }
