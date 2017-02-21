import { NgModule }		 from '@angular/core';
import { CommonModule }	 from '@angular/common';
import { FormsModule }	 from '@angular/forms';

import { PageStreamComponent } from './components/stream/stream.component';

import { RoutingModule } from './routing.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RoutingModule
	],
	declarations: [
		PageStreamComponent
	],
	providers: [ ]
})
export class StreamModule {}

