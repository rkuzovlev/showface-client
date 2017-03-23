import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageIndexComponent } from './components/index/index.component';
import { LoadBrowseStreamsGuard } from './services/browse-guard.service'

const routes: Routes = [
	{
		path: '',
		component: PageIndexComponent,
		canActivate: [ LoadBrowseStreamsGuard ]
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