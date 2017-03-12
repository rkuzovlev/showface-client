import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../_services/auth-guard.service';
import { AuthAdminGuard } from './../_services/auth-admin-guard.service';

import { ProfileComponent }			from './components/profile/profile.component';
import { UserComponent }			from './components/user/user.component';
import { StreamsComponent }		 	from './components/streams/streams.component';
import { StreamComponent }		 	from './components/stream/stream.component';
import { SubscriptionsComponent } 	from './components/subscriptions/subscriptions.component';
import { FriendsComponent } 		from './components/friends/friends.component';
import { AdminUsersComponent } 		from './components/admin-users/admin-users.component';
import { LoadTokenGuard } from '../_services/load-token-guard.service';


const routes: Routes = [
	{
		path: 'profile', 
		component: ProfileComponent,
		canActivate: [ LoadTokenGuard ],
		children: [
			{ 
				path: 'admin', 
				canActivate: [AuthGuard, AuthAdminGuard],
				canActivateChild: [AuthGuard, AuthAdminGuard],
				children: [
					{ path: 'users', component: AdminUsersComponent },
					{ path: '**', redirectTo: 'users' },
				]
			},
			{ 
				path: '', 
				canActivate: [AuthGuard],
				canActivateChild: [AuthGuard],
				children: [
					{ path: '', component: UserComponent },
					{ path: 'streams', component: StreamsComponent },
					{ path: 'streams/:id', component: StreamComponent },
					{ path: 'subscriptions', component: SubscriptionsComponent },
					{ path: 'friends', component: FriendsComponent },
					{ path: '**', redirectTo: '' },
				]
			},
			{ path: '**', redirectTo: '' },
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