import { BrowserModule }	from '@angular/platform-browser';
import { NgModule } 		from '@angular/core';
import { FormsModule } 		from '@angular/forms';
import { HttpModule } 		from '@angular/http';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { RouterStoreModule } from '@ngrx/router-store'

import { reducer } from './_reducers'

import { AppRoutingModule } 	from './_modules/app-routing.module';
import { ProfileModule } 		from './profile/profile.module';
import { StreamModule } 		from './stream/stream.module';
import { IndexModule } 			from './index/index.module';
import { AboutModule } 			from './about/about.module';
import { LoginModule } 			from './login/login.module';

import { ModalWindowService } 	from "./_services/modal-window.service";
import { UserService } 			from "./_services/user.service";
import { AuthGuard } 			from "./_services/auth-guard.service";
import { AuthAdminGuard } 		from "./_services/auth-admin-guard.service";

import { LoginComponent }		from './_components/login/login.component';
import { AppComponent }			from './_components/app/app.component';
import { NavComponent }			from './_components/nav/nav.component';
import { FooterComponent }		from './_components/footer/footer.component';
import { ModalComponent }		from './_components/modal/modal.component';

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		FooterComponent,
		ModalComponent,
		LoginComponent,
	],
	imports: [
		StoreModule.provideStore(reducer),
		RouterStoreModule.connectRouter(),
		IndexModule,
		LoginModule,
		AboutModule,
		StreamModule,
		ProfileModule,
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [
		ModalWindowService,
		UserService,
		AuthGuard,
		AuthAdminGuard,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
