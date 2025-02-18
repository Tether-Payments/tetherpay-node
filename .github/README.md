# TetherPay NodeSDK

<div align="center">

[![Maintainability](https://api.codeclimate.com/v1/badges/611da423f8c28e7cfb17/maintainability)](https://codeclimate.com/repos/6724edbfd7b7a10752552963/maintainability)
[![codecov](https://codecov.io/gh/Tether-Payments/sdk-node/graph/badge.svg?token=R0BWFG45QS)](https://codecov.io/gh/Tether-Payments/sdk-node)
[![CodeQL](https://github.com/Tether-Payments/tetherpay-node/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Tether-Payments/tetherpay-node/actions/workflows/github-code-scanning/codeql)


</div>

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
