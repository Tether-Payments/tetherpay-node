import { createSign, createVerify } from 'crypto';

export type SignedRequestParams = {
  body: string | undefined | null;
};

export function generateSignature(
  privateKey,
  { body = '{}' }: SignedRequestParams
) {
  const sign = createSign('SHA256');

  sign.update(Buffer.from(JSON.stringify(body)));

  sign.end();
  return sign.sign(privateKey, 'base64');
}

export function verifySignature(
  publicKey,
  signature,
  { body = '{}' }: SignedRequestParams
) {
  const verify = createVerify('SHA256');

  verify.update(Buffer.from(JSON.stringify(body)));

  verify.end();
  return verify.verify(publicKey, Buffer.from(signature, 'base64'));
}
