import { NgModule }		 from '@angular/core';
import { CommonModule }	 from '@angular/common';
import { FormsModule }	 from '@angular/forms';

import { PageStreamComponent } from './components/stream/stream.component';

import { RoutingModule } from './routing.module';
import { StreamExistsGuard } from './services/stream-guard.service';
import { StreamService } from './services/stream.service'


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RoutingModule
	],
	declarations: [
		PageStreamComponent
	],
	providers: [
		StreamService,
		StreamExistsGuard,
	]
})
export class StreamModule {}

