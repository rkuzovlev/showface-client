import { NgModule }		 from '@angular/core';
import { CommonModule }	 from '@angular/common';
import { FormsModule }	 from '@angular/forms';

import { PageStreamComponent } from './components/stream/stream.component';
import { PageStreamEditComponent } from './components/stream-edit/stream-edit.component';
import { StreamEditFormComponent } from './components/stream-edit-form/stream-edit-form.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatNewMessageComponent } from './components/chat-new-message/chat-new-message.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ModeratorsComponent } from './components/moderators/moderators.component';
import { StreamersComponent } from './components/streamers/streamers.component';
import { TitleComponent } from './components/title/title.component';
import { WebrtcButtonsComponent } from './components/webrtc-buttons/webrtc-buttons.component';
import { WebrtcVideoComponent } from './components/webrtc-video/webrtc-video.component';
import { DescriptionComponent } from './components/description/description.component';

import { RoutingModule } from './routing.module';
import { SharedModule } from '../shared.module';

import { StreamGuard } from './services/stream-guard.service';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RoutingModule,
		SharedModule
	],
	declarations: [
		PageStreamComponent,
		PageStreamEditComponent,
		StreamEditFormComponent,
		ChatComponent,
		CommentsComponent,
		ModeratorsComponent,
		StreamersComponent,
		TitleComponent,
		WebrtcButtonsComponent,
		WebrtcVideoComponent,
		ChatNewMessageComponent,
		DescriptionComponent,
	],
	providers: [
		StreamGuard,
	]
})
export class StreamModule {}

