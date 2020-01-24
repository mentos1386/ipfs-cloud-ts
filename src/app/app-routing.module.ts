import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncryptComponent } from './encrypt/encrypt.component';
import { DecryptComponent } from './decrypt/decrypt.component';
import { PgpComponent } from './pgp/pgp.component';


const routes: Routes = [
  { path: 'encrypt', component: EncryptComponent },
  { path: 'decrypt', component: DecryptComponent },
  { path: 'pgp', component: PgpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
