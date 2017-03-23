import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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