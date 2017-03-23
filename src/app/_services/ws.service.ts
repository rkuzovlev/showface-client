import { Injectable }    from '@angular/core';

import { Observable } from 'rxjs';

import { SocketClusterTransport } from './ws-transports/socketcluster.transport'
import { Transport } from './ws-transports/transport.interface'

@Injectable()
export class WSService {
    private transport: Transport

    constructor() {
        this.transport = new SocketClusterTransport();
    }

    public subscribeToStream(id: number){
        this.subscribe('stream.' + id);
    }

    public unsubscribeFromStream(id: number){
        this.unsubscribe('stream.' + id);
    }

    private subscribe(name: string){
        this.transport.subscribe(name);
    }

    private unsubscribe(name: string){
        this.transport.unsubscribe(name);        
    }
}