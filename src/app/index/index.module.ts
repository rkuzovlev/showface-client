import { NgModule }		 from '@angular/core';
import { CommonModule }	 from '@angular/common';
import { FormsModule }	 from '@angular/forms';

import { PageIndexComponent } from './components/index/index.component';

import { RoutingModule } from './routing.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RoutingModule
	],
	declarations: [
		PageIndexComponent
	],
	providers: [ ]
})
export class IndexModule {}

