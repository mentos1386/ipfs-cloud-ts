import { createReducer, on } from '@ngrx/store';
import { generateKey } from './pgp.actions';
import { key } from 'openpgp';

export const initialState: key.Key = null;

const _counterReducer = createReducer(initialState,
  on(generateKey, state => ),
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}