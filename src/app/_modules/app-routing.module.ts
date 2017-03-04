import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
	{ path: '404', redirectTo: '' },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [ RouterModule ],
	declarations: []
})
export class AppRoutingModule { }