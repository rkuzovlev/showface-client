import { Action } from '@ngrx/store';
import { Stream } from '../_models/stream';
import { type } from '../utils';

export const ActionTypes = {
  LOAD_STREAM: 		type('[Stream] Load stream'),
};


export class LoadStreamAction implements Action {
  type = ActionTypes.LOAD_STREAM;

  constructor(public payload: number) { }
}

export type Actions
  = LoadStreamAction
//   | LoadSuccessAction
  ;
