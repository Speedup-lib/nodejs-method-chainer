/**
 * Tests entry point
 */

import 'mocha';

describe('SpeedUP|nodejs-method-chainer', () => {

    describe('conductor', () => import('./conductor'));
    describe('conductor-builder', () => import('./conductor-factory'));
    describe('handler-factory', () => import('./handler-factory'));
});