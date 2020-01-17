import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CryptoService } from './crypto.service';
import * as openpgp from 'openpgp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pgpKey: openpgp.key.Key;
  encryptedMessage: string;

  message = new FormControl('');

  constructor(private cryptoService: CryptoService) {
  }

  async generatePgpKey() {
    this.pgpKey = await this.cryptoService.generatePgpKeys('test', 'test@test.com', 'test');
  }

  async encryptMessage() {
    const message = await this.cryptoService.encrypt(this.message.value, this.pgpKey, []);
    this.encryptedMessage = message.encryptedMessage;
  }
}
