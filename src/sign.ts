import { createSign, createVerify } from 'crypto';

export type SignedRequestParams = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | string;
  uri: string;
  timestamp: number;
  body: string | undefined | null;
};

export function generateSignature(
  privateKey,
  { method, uri, timestamp, body }: SignedRequestParams
) {
  const url = new URL(uri);
  const path = `${url.pathname}${url.search ? url.search : ''}`;

  const sign = createSign('SHA256');

  sign.update(`${method.toUpperCase()}${path}${timestamp}`);
  if (body) {
    sign.update(Buffer.from(JSON.stringify(body)));
  }

  sign.end();
  return Buffer.from(sign.sign(privateKey)).toString('base64');
}

export function verifySignature(
  publicKey,
  signature,
  { method, uri, timestamp, body }: SignedRequestParams
) {
  const url = new URL(uri);
  const path = url.pathname + url.search;

  const verify = createVerify('SHA256');

  verify.update(`${method.toUpperCase()}${path}${timestamp}`);
  if (body) {
    verify.update(Buffer.from(JSON.stringify(body)));
  }

  verify.end();
  return verify.verify(publicKey, Buffer.from(signature, 'base64'));
}
