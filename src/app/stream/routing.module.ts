import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageStreamComponent } from './components/stream/stream.component';

import { StreamExistsGuard } from './services/stream-guard.service';

const routes: Routes = [
	{ 
		path: 'stream/:id', 
		component: PageStreamComponent,
		canActivate: [ StreamExistsGuard ]
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