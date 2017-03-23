import { Subject } from 'rxjs';

import { Message } from './message'
import { Statuses } from './statuses'

export interface Transport {
	status$: Subject<Statuses>;
	error$: Subject<Error>;
	message$: Subject<Message>;

	subscribe(name: string);
	unsubscribe(name: string);
	emit(event: string, data: any);
}