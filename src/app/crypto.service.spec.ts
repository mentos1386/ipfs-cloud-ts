import { TestBed } from '@angular/core/testing';

import { CryptoService } from './crypto.service';
import { Buffer } from 'buffer';

describe('CryptoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptoService = TestBed.get(CryptoService);
    expect(service).toBeTruthy();
  });

  it('should encrypt file', async () => {
    const dummyFile = 'some dummy content';

    const service: CryptoService = TestBed.get(CryptoService);
    const encryptedFile, masterKey = await service.encrypt(dummyFile);

    expect(encryptedFile).not.toBeNull();
    expect(masterKey).not.toBeNull();
  })
});
