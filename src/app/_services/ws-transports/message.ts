export enum MessageTypes {
	Stream = 1,
	StreamChat,	
}

export class StreamMessage {
	public type = MessageTypes.Stream
	public streamId: number
	public static regexp: RegExp = new RegExp('^stream\.([0-9]+)$');
	constructor(
		private event: string,
		public data: any,
	){
		let res = StreamMessage.regexp.exec(this.event);
		this.streamId = parseInt(res[1]);
	}
}

export class StreamChatMessage {
	public type = MessageTypes.StreamChat
	public streamId: number
	public static regexp: RegExp = new RegExp('^stream\.([0-9]+).chat$');
	constructor(
		private event: string,
		public data: any,
	){
		let res = StreamChatMessage.regexp.exec(this.event);
		this.streamId = parseInt(res[1]);
	}
}

export function CreateWsMsg(event: string, data: any): Messages {
	if (StreamMessage.regexp.test(event)){
		return new StreamMessage(event, data);
	}

	if (StreamChatMessage.regexp.test(event)){
		return new StreamChatMessage(event, data);
	}

	throw new Error("Can't create new ws message, unknown event " + event);
}

export type Messages
	= StreamMessage
	| StreamChatMessage
	;