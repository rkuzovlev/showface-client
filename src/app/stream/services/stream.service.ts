import { Injectable }    from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Stream } from "../../_models/stream";

import "rxjs/add/operator/toPromise";
import 'rxjs/add/operator/map'


@Injectable()
export class StreamService {
    // private subject = new Subject<Modal>();

    constructor(private http: Http) { }

    getStream(id: number): Observable<Stream> {
        return this.http.get('/api/streams/' + id).map((response: Response) => response.json() as Stream);
    }
}