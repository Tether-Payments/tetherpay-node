import { generateKeyPairSync } from 'crypto';

// Generate an ECDSA key pair using the 'secp256k1' curve
export function getMockedKeyPair() {
  const mockedKeyPair = generateKeyPairSync('ec', {
    namedCurve: 'secp256k1',
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  return mockedKeyPair;
}
