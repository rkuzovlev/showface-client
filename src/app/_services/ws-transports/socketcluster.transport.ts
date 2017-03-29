import { Observable, Subject } from 'rxjs';

import * as sc from 'socketcluster-client';

import { Messages, MessageTypes, CreateWsMsg, StreamChatMessage, StreamMessage } from './message';
import { Statuses } from './statuses';
import { Transport } from './transport.interface';

export class SocketClusterTransport implements Transport {
	private socket: any;
	public status$: Subject<Statuses> = new Subject();
	public error$: Subject<Error> = new Subject();
	public message$: Subject<Messages> = new Subject();

	constructor (){
		this.socket = sc.connect();

		this.socket.on('error', this._error.bind(this));
		this.socket.on('connect', this._connect.bind(this));
		this.socket.on('disconnect', this._disconnect.bind(this));
		this.socket.on('connecting', this._connecting.bind(this));
		this.socket.on('message', this._message.bind(this));

		this.status$.next(Statuses.Disconnected);
	}

	public subscribe(name: string){
		this.socket.subscribe(name);
	}

	public unsubscribe(name: string){
		this.socket.unsubscribe(name);
	}

	public emit(event: string, data: any){
		this.socket.emit(event, data);
	}

	private _error(err){
		this.error$.next(err);
		console.log('socketcluster _error', arguments);
	}

	private _connect(authObj){
		this.status$.next(Statuses.Connected);
		console.log('socketcluster _connect', authObj);
	}

	private _disconnect(){
		this.status$.next(Statuses.Disconnected);
		console.log('socketcluster _disconnect', arguments);
	}

	private _connecting(){
		this.status$.next(Statuses.Connecting);
		console.log('socketcluster _connecting', arguments);
	}

	/**
	 * 	When message published into channel
	 * 
	 * 	{
	 * 		"event": "#publish",
	 * 		"data": {
	 * 			"channel": "stream.2",
	 * 			"data": {
	 * 				"action": "new_message",
	 * 				"message": { "id": 13, "nickname": "user365", "message": "test msg" }
	 * 			}
	 * 		}
	 * 	}
	 */
	private _message(message: string){
		try {
			let parsed = JSON.parse(message);
			if (parsed.event && parsed.event == '#publish'){
				let wsmsg: Messages = CreateWsMsg(parsed.data.channel, parsed.data.data);
				this.message$.next(wsmsg);
			}
		} catch(err) {
			if (message != "#1"){ // skip ping message
				console.error("Can't parse message '" + message + "' from WS", err);
			}
		}

		if (message != "#1"){ // skip ping message
			console.log('socketcluster _message', arguments);
		}
	}
}