import { generateSignature, SignedRequestParams, verifySignature } from '../../src/sign';
import { getMockedKeyPair } from '../utils';

const mockedKeyPair = getMockedKeyPair();
const mockedRequestParams: SignedRequestParams = {
    method: 'POST',
    uri: 'http://us.example.com/sessions',
    timestamp: new Date().getTime(),
    body: JSON.stringify({ data: true }),
  };

describe('sign', () => {
  describe('generateSignature', () => {
    it('generates a request signature from a private key', async () => {
      const generatedSignature = generateSignature(mockedKeyPair.privateKey, mockedRequestParams);

      expect(generatedSignature).toBeTruthy();
    });
  });

  describe('verifySignature', () => {
    it('verifies a request signature using a public key', async () => {
      const generatedSignature = generateSignature(mockedKeyPair.privateKey, mockedRequestParams);

      const verified = verifySignature(
        mockedKeyPair.publicKey,
        generatedSignature,
        mockedRequestParams
      );

      expect(verified).toBe(true);
    });

    it('verifies a GET request signature using a public key', async () => {
        const mockedRequestGet: SignedRequestParams = {
            ...mockedRequestParams,
            method: 'GET',
            body: null,
        }
        const generatedSignature = generateSignature(mockedKeyPair.privateKey, mockedRequestGet);
  
        const verified = verifySignature(
          mockedKeyPair.publicKey,
          generatedSignature,
          mockedRequestGet,
        );
  
        expect(verified).toBe(true);
      });
  });
});
