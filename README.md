# JavaScript/TypeScript method chainer

Chain your JavaScript/TypeScript callbacks/promises together to handle the most complex workflows in a functional way.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

## Installation

```sh

# NPM
npm i @speedup/method-chainer --save

# Yarn
yarn install @speedup/method-chainer

```

## Usage

#### JavaScript

```js


const MethodChainer = require('@speedup/method-chainer').default;

const factory = new MethodChainer.ConductorFactory();

const adderAsync = (c) => async (n) => n + c;
const adderCallback = (c) => (n, callback) => callback(null, n + c);

factory
    .handle(MethodChainer.HandlerFactory.wrapAsyncMethod(adderAsync(2)))
    (MethodChainer.HandlerFactory.wrapCallbackMethod(adderCallback(2)));

const conductor = factory.toConductor();

conductor.run(2, (err, result) => {

    // result is equal to 6
});

conductor.runAsync(2)
    .then(result => {

        // result is equal to 6
    })
    .catch(err => { });

// inside an awaitable function
const result = await conductor.runAsync(2);
// result is equal to 6

```

#### TypeScript

```ts


import MethodChainer from '@speedup/method-chainer';

const factory = new MethodChainer.ConductorFactory();

// these are method factories
const adderAsync = (c: number) => async (n: number) => n + c;
const adderCallback = (c: number) => (n: number, callback: (err: any, result: number) => void): void => callback(null, n + c);

// add your flow here
factory
    .handle<number, number>(MethodChainer.HandlerFactory.wrapAsyncMethod(adderAsync(2)))
    <number>(MethodChainer.HandlerFactory.wrapCallbackMethod(adderCallback(2)));

// generate conductor
const conductor = factory.toConductor();

// run using callback
conductor.run(2, (err, result) => {

    // result is equal to 6
});

// run using promise
conductor.runAsync(2)
    .then(result => {

        // result is equal to 6
    })
    .catch(err => { });

// run using await keyword
// inside an awaitable function
const result = await conductor.runAsync(2);
// result is equal to 6

```

And you're good to go!

## License

MIT

[npm-image]: https://img.shields.io/npm/v/@speedup/method-chainer.svg?color=orange
[npm-url]: https://npmjs.org/package/@speedup/method-chainer
[downloads-image]: https://img.shields.io/npm/dt/@speedup/method-chainer.svg
[downloads-url]: https://npmjs.org/package/@speedup/method-chainer
