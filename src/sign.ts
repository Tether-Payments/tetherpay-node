import { etc, sign } from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';
etc.sha512Sync = (...m) => sha512(etc.concatBytes(...m));

const bytesToBase64 = (bytes: Uint8Array): string => Buffer.from(bytes).toString('base64');
const base64ToBytes = (base64Str: string): Uint8Array => Buffer.from(base64Str, 'base64');

export function signWithPrivateKey(data: any | string, privateKey: string) {
  let key = new Uint8Array(Buffer.from(privateKey, 'base64'));
  if (key.length > 32) {
    key = key.slice(0, 32);
  }
  const message = new TextEncoder().encode(typeof data !== 'string' ? JSON.stringify(data) : data);
  return bytesToBase64(sign(message, key));
}
