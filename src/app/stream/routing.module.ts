import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageStreamComponent } from './components/stream/stream.component';
import { PageStreamEditComponent } from './components/stream-edit/stream-edit.component';

import { StreamGuard } from './services/stream-guard.service';

const routes: Routes = [
	{ 
		path: 'stream/:id', 
		component: PageStreamComponent,
		canActivate: [ StreamGuard ]
	},
	{ 
		path: 'stream/:id/edit', 
		component: PageStreamEditComponent,
		canActivate: [ StreamGuard ]
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