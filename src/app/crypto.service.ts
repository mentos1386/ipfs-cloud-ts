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

  public decryptUsingKey(encryptedMessage: openpgp.message.Message, key: openpgp.key.Key): Promise<openpgp.message.Message> {
    return encryptedMessage.decrypt([key]);
  }

  public decryptUsingPassword(encryptedMessage: openpgp.message.Message, password: string): Promise<openpgp.message.Message> {
    return encryptedMessage.decrypt([], [password]);
  }

  public async encrypt(message: string, ownerKey: openpgp.key.Key, sharedKeys: openpgp.key.Key[]): Promise<{
    encryptedMessage: string,
    encryptedMasterKey: openpgp.message.Message,
  }> {
    const fileHash = CryptoJS.SHA3(message).toString();
    const masterKey = this.generateSecret();

    const encryptedMessage = CryptoJS.AES.encrypt(message, masterKey).toString();

    const encryptedMasterKey = await openpgp.encrypt({
      message: openpgp.message.fromText(masterKey),
      passwords: [fileHash],                 // accessible to anyone that knows the hash of the contents
      publicKeys: [ownerKey, ...sharedKeys], // and to anyone whose publickey was used to encrypt
      privateKeys: [ownerKey],               // to verify this file was uploaded by us.
      armor: false,
    });

    return {encryptedMessage, encryptedMasterKey: encryptedMasterKey.message}
  }

  public async generatePgpKeys(name: string, email: string, passphrase: string): Promise<openpgp.key.Key> {
    const openpgpKey = await openpgp.generateKey({
      userIds: [{ name, email }],
      passphrase,
    });
    return openpgpKey.key;
  }

}
