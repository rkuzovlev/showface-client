import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageIndexComponent } from './components/index/index.component';

const routes: Routes = [
	{ path: '', component: PageIndexComponent },
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [ RouterModule ],
	declarations: []
})
export class RoutingModule { }