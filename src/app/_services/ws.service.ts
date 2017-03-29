import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { MessageTypes, Messages, StreamMessage, StreamChatMessage } from './ws-transports/message';
import { SocketClusterTransport } from './ws-transports/socketcluster.transport';
import { Transport } from './ws-transports/transport.interface';
import { Statuses } from './ws-transports/statuses';

import * as reducers from '../_reducers';
import * as wsActions from '../_actions/ws';
import * as streamsActions from '../_actions/streams';

import { Stream } from '../_models/stream';

@Injectable()
export class WSService {
    private transport: Transport

    constructor(
        private store: Store<reducers.State>,
    ) {
        this.transport = new SocketClusterTransport();
        
        this.transport.status$.subscribe((status: Statuses) => {
            switch(status){
                case Statuses.Disconnected: {
                    this.store.dispatch(new wsActions.ChangeStatusAction(wsActions.Statuses.Disconnected));
                }

                case Statuses.Connecting: {
                    this.store.dispatch(new wsActions.ChangeStatusAction(wsActions.Statuses.Connecting));
                }

                case Statuses.Connected: {
                    this.store.dispatch(new wsActions.ChangeStatusAction(wsActions.Statuses.Connected));
                }
            }
        });

        this.transport.error$.subscribe((err: Error) => {
            this.store.dispatch(new wsActions.ErrorAction(err));
        });
        
        this.transport.message$.subscribe((msg: Messages) => {
            switch (msg.type){
                case MessageTypes.Stream: {
                    this.store.dispatch(new streamsActions.AddStreamAction(msg.data as Stream));
                    break;
                }

                case MessageTypes.StreamChat: {

                    break;
                }
            }
        });
    }

    public subscribeToStream(id: number){
        this.subscribe('stream.' + id);
    }

    public unsubscribeFromStream(id: number){
        this.unsubscribe('stream.' + id);
    }

    public subscribeToStreamChat(id: number){
        this.subscribe('stream.' + id + '.chat');
    }

    public unsubscribeFromStreamChat(id: number){
        this.unsubscribe('stream.' + id + '.chat');
    }

    private subscribe(name: string){
        this.transport.subscribe(name);
    }

    private unsubscribe(name: string){
        this.transport.unsubscribe(name);
    }
}