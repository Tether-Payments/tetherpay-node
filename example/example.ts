import { TetherPayments } from '../';
import { verifySignature } from '../src/sign';
import { getMockedKeyPair } from '../tests/utils';

import { createServer } from 'http';

const hostname = '127.0.0.1';
const port = 9000;

const keyPair = getMockedKeyPair();

const tpgClient = new TetherPayments({
  privateKey: keyPair.privateKey,
  serverUri: `http://${hostname}:${port}`,
});

(async () => {
  const server = createServer((req, res) => {
    const host = req.headers['host'];
    const signature = req.headers['x-signature'];
    const timestamp = req.headers['x-timestamp'];
    const { method, url } = req;

    const params = {
      method: method!,
      uri: `http://${host}${url}`,
      timestamp: parseInt(timestamp?.toString()!),
      body: null,
    };

    const validSig = verifySignature(keyPair.publicKey, signature?.toString(), params);
    console.log('valid signature?', validSig);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: 1 }));
  });

  server.listen(port, hostname, async () => {
    console.log(`Server running at http://${hostname}:${port}/`);

    // Call SDK method
    const res = await tpgClient.getSessionById(1);
    console.log(res);

    process.exit();
  });
})();
