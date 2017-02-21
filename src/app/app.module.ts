import { BrowserModule }	from '@angular/platform-browser';
import { NgModule } 		from '@angular/core';
import { FormsModule } 		from '@angular/forms';
import { HttpModule } 		from '@angular/http';

import { AppRoutingModule } 	from './common/modules/app-routing.module';
import { ProfileModule } 		from './profile/profile.module';
import { StreamModule } 		from './stream/stream.module';
import { IndexModule } 			from './index/index.module';
import { AboutModule } 			from './about/about.module';
import { LoginModule } 			from './login/login.module';

import { ModalWindowService } 	from "./common/services/modal-window.service";
import { UserService } 			from "./common/services/user.service";
import { AuthGuard } 			from "./common/services/auth-guard.service";
import { AuthAdminGuard } 		from "./common/services/auth-admin-guard.service";

import { LoginComponent }		from './common/components/login/login.component';
import { AppComponent }			from './common/components/app/app.component';
import { NavComponent }			from './common/components/nav/nav.component';
import { FooterComponent }		from './common/components/footer/footer.component';
import { ModalComponent }		from './common/components/modal/modal.component';

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		FooterComponent,
		ModalComponent,
		LoginComponent,
	],
	imports: [
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
