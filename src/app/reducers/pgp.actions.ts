import { createAction, props } from '@ngrx/store';

export const generateKey = createAction(
    '[PGP] Generate Key',
    props<{ name: string, email: string, passprase: string }>()
);
