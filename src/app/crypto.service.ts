import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as openpgp from 'openpgp';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }


  private generateSecret(): string {
    return CryptoJS.lib.WordArray.random(42);
  }

  public encrypt(file: string): { encryptedFile: string, secret: string } {
    const secret = this.generateSecret();
    const encryptedFile = CryptoJS.AES.encrypt(file.toString(), secret).toString();

    return { encryptedFile, secret };
  }

  public decrypt(file: string, secret: string): string {
    return CryptoJS.AES.decrypt(file, secret).toString();
  }

  public generatePublicPrivateKeys(): { public: string, private: string} {
    return openpgp.
  }
}
