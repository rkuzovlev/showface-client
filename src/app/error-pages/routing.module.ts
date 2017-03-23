import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
	{
		path: '404', 
		component: ErrorPageComponent,
		data: { text: 'Not Found', status: 404 }
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