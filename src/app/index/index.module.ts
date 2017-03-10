import { NgModule }		 from '@angular/core';
import { CommonModule }	 from '@angular/common';
import { FormsModule }	 from '@angular/forms';

import { SharedModule } from '../shared.module'


import { PageIndexComponent } from './components/index/index.component';

import { RoutingModule } from './routing.module';
import { LoadBrowseStreamsGuard } from './services/browse-guard.service'


@NgModule({
	imports: [
		SharedModule,
		CommonModule,
		FormsModule,
		RoutingModule
	],
	declarations: [
		PageIndexComponent,
	],
	providers: [
		LoadBrowseStreamsGuard,
	]
})
export class IndexModule {}

