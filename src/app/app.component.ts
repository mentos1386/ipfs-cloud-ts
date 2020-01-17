import { Component } from '@angular/core';
import { CryptoService } from './crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  privateKey: string;
  publicKey: string;


  constructor(private cryptoService: CryptoService) {
  }

  async generatePgpKey() {
    const key = await this.cryptoService.generatePgpKeys('test', 'test@test.com', 'test');
    this.privateKey = key.armor();
    this.publicKey = key.toPublic().armor();
  }
}
