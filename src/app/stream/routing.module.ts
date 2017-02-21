import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageStreamComponent } from './components/stream/stream.component';

const routes: Routes = [
	{ path: 'stream/:id', component: PageStreamComponent },
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [ RouterModule ],
	declarations: []
})
export class RoutingModule { }