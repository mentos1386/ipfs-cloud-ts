import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as openpgp from 'openpgp';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  private bufferToBase64(arrayBuffer: ArrayBuffer): string {
    const uintArray = new Uint8Array(arrayBuffer);
    const stringValue = uintArray.reduce<string>((data, byte) => data + String.fromCharCode(byte), '');
    return btoa(stringValue);
  }

  private base64ToBuffer(base64String: string): ArrayBuffer {
    // TODO: Implement
    return new ArrayBuffer(0);
  }

  public decryptUsingKey(encryptedMessage: openpgp.message.Message, key: openpgp.key.Key): Promise<openpgp.message.Message> {
    return encryptedMessage.decrypt([key]);
  }

  public decryptUsingPassword(encryptedMessage: openpgp.message.Message, password: string): Promise<openpgp.message.Message> {
    return encryptedMessage.decrypt([], [password]);
  }

  public async encrypt(message: string, ownerKey: openpgp.key.Key, sharedKeys: openpgp.key.Key[]): Promise<{
    encryptedMessage: string,
    encryptedMasterKey: openpgp.message.Message | any,
  }> {
    const fileHash = CryptoJS.SHA3(message).toString();
    const masterKey = await crypto.subtle.generateKey({name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
    const masterKeyJson = await crypto.subtle.exportKey('jwk', masterKey);

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedMessage = await crypto.subtle.encrypt({name: 'AES-GCM', iv}, masterKey, new TextEncoder().encode(message));

    const encryptedMasterKey = await openpgp.encrypt({
      message: openpgp.message.fromText(JSON.stringify(masterKeyJson)),
      passwords: [fileHash],                 // accessible to anyone that knows the hash of the contents
      publicKeys: [ownerKey, ...sharedKeys], // and to anyone whose publickey was used to encrypt
      privateKeys: [ownerKey],               // to verify this file was uploaded by us.
      armor: false,
    });

    return {encryptedMessage: this.bufferToBase64(encryptedMessage), encryptedMasterKey: JSON.stringify(encryptedMasterKey.message)};
  }

  public async generatePgpKeys(name: string, email: string, passphrase: string): Promise<openpgp.key.Key> {
    const openpgpKey = await openpgp.generateKey({
      userIds: [{ name, email }],
      passphrase,
    });
    return openpgpKey.key;
  }

}
