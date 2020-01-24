import { Component } from '@angular/core';
import { CryptoService } from '../crypto.service';
import * as openpgp from 'openpgp';

@Component({
  selector: 'app-pgp',
  templateUrl: './pgp.component.html',
  styleUrls: ['./pgp.component.scss']
})
export class PgpComponent {

  constructor(private cryptoService: CryptoService) {
  }

  pgpKey: openpgp.key.Key;


  async generatePgpKey() {
    this.pgpKey = await this.cryptoService.generatePgpKeys('test', 'test@test.com', 'test');
    const success = await this.pgpKey.decrypt('test');
  }
}
