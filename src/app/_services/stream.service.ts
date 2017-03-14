import { Injectable }    from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { Subject } from 'rxjs/Subject';
import { Stream } from "../_models/stream";
import { User } from "../_models/user";

import { ApiService } from "./api.service";

import 'rxjs/add/operator/map'


@Injectable()
export class StreamService {
    // private subject = new Subject<Modal>();

    constructor(
        private api: ApiService
    ) { }

    getStream(id: number): Observable<Stream> {
        return this.api.get(`/streams/${id}`).map((response: Response) => response.json() as Stream);
    }

    getStreamModerators(streamId: number): Observable<User[]> {
        return this.api.get(`/streams/${streamId}/moderators`).map((response: Response) => response.json() as User[]);
    }

    getStreamStreamers(streamId: number): Observable<User[]> {
        return this.api.get(`/streams/${streamId}/streamers`).map((response: Response) => response.json() as User[]);
    }

    getBrowseStreams(): Observable<Stream[]> {
        return this.api.get(`/streams/browse`).map((response: Response) => response.json() as Stream[]);
    }

    putStream(stream: Stream): Observable<Stream> {
        if (!stream.id) {
            return _throw(new Error('Stream has no id'));
        }
        return this.api.put(`/streams/${stream.id}`, stream).map((response: Response) => response.json() as Stream);
    }
}