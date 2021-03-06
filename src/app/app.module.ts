import { BrowserModule }	from '@angular/platform-browser';
import { NgModule } 		from '@angular/core';
import { Store } 			from '@ngrx/store';

import { StoreModule } 		 	from '@ngrx/store'
import { EffectsModule } 	 	from '@ngrx/effects'
import { RouterStoreModule } 	from '@ngrx/router-store'
import { StoreDevtoolsModule }	from '@ngrx/store-devtools';

import { SharedModule } 		from './shared.module'
import { AppRoutingModule } 	from './_modules/app-routing.module';
import { ProfileModule } 		from './profile/profile.module';
import { StreamModule } 		from './stream/stream.module';
import { IndexModule } 			from './index/index.module';
import { AboutModule } 			from './about/about.module';
import { LoginModule } 			from './login/login.module';
import { ErrorPagesModule } 	from './error-pages/error-pages.module';

import { ModalWindowService } 	from "./_services/modal-window.service";
import { AuthService } 			from "./_services/auth.service";
import { AuthGuard } 			from "./_services/auth-guard.service";
import { WSService } 			from "./_services/ws.service";
import { AuthAdminGuard } 		from "./_services/auth-admin-guard.service";
import { StorageService } 		from "./_services/storage.service";
import { StreamService } 		from './_services/stream.service'

import { LoginComponent }			from './_components/login/login.component';
import { AppComponent }				from './_components/app/app.component';
import { NavComponent }				from './_components/nav/nav.component';
import { FooterComponent }			from './_components/footer/footer.component';
import { ModalComponent }			from './_components/modal/modal.component';

import { UserEffects } from './_effects/user'
import { StreamEffects } from './_effects/stream'

import { reducer, State } from './_reducers'
import * as userActions from './_actions/user';


@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		FooterComponent,
		ModalComponent,
		LoginComponent,
	],
	imports: [
		SharedModule,
		StoreModule.provideStore(reducer),
		RouterStoreModule.connectRouter(),
    	StoreDevtoolsModule.instrumentOnlyWithExtension(),
		IndexModule,
		LoginModule,
		AboutModule,
		StreamModule,
		ProfileModule,
		ErrorPagesModule,
		AppRoutingModule,
		BrowserModule,
		EffectsModule.run(UserEffects),
		EffectsModule.run(StreamEffects),
	],
	providers: [
		StreamService,
		StorageService,
		WSService,
		ModalWindowService,
		AuthService,
		AuthGuard,
		AuthAdminGuard,
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(
		private store: Store<State>,
		private ws: WSService,
	){
		this.store.dispatch(new userActions.LoadTokenAction());
	}
}
