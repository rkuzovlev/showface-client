import { NgModule }		 from '@angular/core';
import { CommonModule }	 from '@angular/common';
import { FormsModule }	 from '@angular/forms';

import { PageAboutComponent }		from './components/about/about.component';

import { RoutingModule } from './routing.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RoutingModule
	],
	declarations: [
		PageAboutComponent
	],
	providers: [ ]
})
export class AboutModule {}

