export interface ChatUser {
	id: number;
	name: string;
	moderator: boolean;
}

export class ChatMessage {
	constructor(
		public id: number,
		public message: string,
		public user: ChatUser,
		public createdAt: Date,
	){ }
}