import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoadTokenGuard } from '../_services/load-token-guard.service';

const routes: Routes = [
	{ path: '404', redirectTo: '' },
	{ path: '**', redirectTo: '404' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [ RouterModule ],
	declarations: []
})
export class AppRoutingModule { }