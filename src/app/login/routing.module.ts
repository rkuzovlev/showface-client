import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './../_components/login/login.component';
import { LoadTokenGuard } from '../_services/load-token-guard.service';

const routes: Routes = [
	{
		path: '',
		canActivate: [ LoadTokenGuard ],
		children: [
			{ path: 'login', component: LoginComponent }
		]
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