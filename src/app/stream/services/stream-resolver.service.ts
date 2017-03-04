import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Stream } from "../../_models/Stream";
import { StreamService } from "./stream.service"

@Injectable()
export class StreamResolver implements Resolve<Stream> {
	constructor(private streamService: StreamService, private router: Router) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Stream> {
		let id = route.params['id'];

		return this.streamService.getStream(id).then(stream => {
			if (!stream) {
				this.router.navigate(['/']);
				return null;
			}
			
			return stream;
		});
	}
}