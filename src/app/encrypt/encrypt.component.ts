import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.scss']
})
export class EncryptComponent {

  encryptedMessage: string;
  encyrptedMasterKey: string;

  message = new FormControl('');

  constructor(private cryptoService: CryptoService) {
  }

  async encryptMessage() {
    const message = await this.cryptoService.encrypt(this.message.value, this.pgpKey, []);
    this.encryptedMessage = message.encryptedMessage;
    console.log(message.encryptedMasterKey);
    this.encyrptedMasterKey = message.encryptedMasterKey;
  }
}
