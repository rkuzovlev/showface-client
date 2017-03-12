import { NgModule }		 from '@angular/core';
import { CommonModule }	 from '@angular/common';
import { FormsModule }	 from '@angular/forms';

import { ErrorPageComponent } from './components/error-page/error-page.component';

import { RoutingModule } from './routing.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RoutingModule
	],
	declarations: [
		ErrorPageComponent
	],
	providers: [ ]
})
export class ErrorPagesModule {}

