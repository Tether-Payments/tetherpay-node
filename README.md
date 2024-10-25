# TetherPayments NodeSDK

A node.js SDK for TPG sessions and transactions

## Setting started
Install packages
```
npm install
```

## Developing
Build the SDK in watch mode so code changes are reflected in dist
```
npm run dev
```

## Building
Build the sdk for release
```
npm run build
```

## Release
TODO: release to npm when ready to go live or begin testing
```
npm run release
```

## Usage
```js
import { TetherPayments } from '@tpg/node';

const tpgClient = new TetherPayments({
  privateKey: '<PK_HERE>',
  serverUri: 'http://us.example.com',
});

const session = await tpgClient.createSession({ ... });

// TODO: do stuff with the session response

```