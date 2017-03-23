import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Http, RequestOptionsArgs, Response, RequestOptions, Headers } from '@angular/http'
import * as urlJoin from 'url-join';

import * as sc from 'socketcluster-client';

import * as reducers from '../_reducers';

@Injectable()
export class WSService {
	socket: any;

	constructor (){
		this.socket = sc.connect();
		console.log('this.socket', this.socket);
	}
}