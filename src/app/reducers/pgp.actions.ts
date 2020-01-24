import { createAction, props } from '@ngrx/store';

export const PgpGenerateKey = createAction(
    '[PGP] Generate Key',
    props<{ name: string, email: string, passprase: string }>()
);
