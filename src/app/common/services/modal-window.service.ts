import { Injectable }    from '@angular/core';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Modal, ModalType } from "../models/Modal";


@Injectable()
export class ModalWindowService {
    private subject = new Subject<Modal>();

    constructor() { }

    show(modal: Modal) {
        this.subject.next(modal);
    }

    getObservable(): Observable<Modal> {
        return this.subject.asObservable();
    }
}