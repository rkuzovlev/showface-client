import { NgModule }		 from '@angular/core';
import { CommonModule }	 from '@angular/common';
import { FormsModule }	 from '@angular/forms';

import { ProfileComponent }			from './components/profile/profile.component';
import { UserComponent }			from './components/user/user.component';
import { StreamsComponent }		 	from './components/streams/streams.component';
import { StreamComponent }		 	from './components/stream/stream.component';
import { SubscriptionsComponent } 	from './components/subscriptions/subscriptions.component';
import { FriendsComponent } 		from './components/friends/friends.component';
import { AdminUsersComponent } 		from './components/admin-users/admin-users.component';

import { NavComponent } from './components/nav/nav.component';

import { RoutingModule } from './routing.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RoutingModule
	],
	declarations: [
		ProfileComponent,
		UserComponent,
		StreamsComponent,
		StreamComponent,
		SubscriptionsComponent,
		FriendsComponent,
		NavComponent,
		AdminUsersComponent,
	],
	providers: [ ]
})
export class ProfileModule {}

