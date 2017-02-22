import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageStreamComponent } from './components/stream/stream.component';

import { StreamResolver } from './services/stream-resolver.service';

const routes: Routes = [
	{ 
		path: 'stream/:id', 
		component: PageStreamComponent,
		resolve: {
			stream: StreamResolver
		}
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [ RouterModule ],
	declarations: []
})
export class RoutingModule { }