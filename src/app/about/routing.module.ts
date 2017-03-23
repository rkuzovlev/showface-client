import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageAboutComponent } from './components/about/about.component';
import { LoadTokenGuard } from '../_services/load-token-guard.service';

const routes: Routes = [
	{ path: 'about', component: PageAboutComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [ RouterModule ],
	declarations: []
})
export class RoutingModule { }