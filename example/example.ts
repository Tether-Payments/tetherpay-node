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
    const signature = req.headers['x-signature'];

    let body = [];
    req.on('data', chunk => body.push(chunk as never));

    req.on('end', () => {
        let parsedBody;
        if (req.headers['content-type'] === 'application/json') {
            parsedBody = JSON.parse(Buffer.concat(body).toString());
        }

        const params = {
          body: parsedBody ? JSON.stringify(parsedBody) : undefined,
        };
    
        const validSig = verifySignature(keyPair.publicKey, signature?.toString(), params);
        console.log('valid signature?', validSig);
    
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: 1 }));
    });
  });

  await server.listen(port, hostname);
  console.log(`Server running at http://${hostname}:${port}/`);

    // Call SDK method
    const res = await tpgClient.createSession({
      toUUID: '1ab6d1b9-9a0f-4057-96ce-b8f3e057fcd5',
      referenceNumber: '1',
    });
    console.log(res);

    process.exit();
})();
