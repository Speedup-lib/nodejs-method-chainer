/**
 * handler-factory
 */

import { expect } from 'chai';

import * as HandlerFactory from '../../src/lib/handler-factory';

describe('handler-factory', () => {

    describe('integrity', () => {

        it('module should be constantly fixed', () => {

            expect(HandlerFactory).to.be.an('object');

            expect(HandlerFactory.Handler).to.be.a('function');
            expect(HandlerFactory).to.have.property('wrapAsyncMethod').that.is.a('function');
            expect(HandlerFactory).to.have.property('wrapCallbackMethod').that.is.a('function');
            expect(HandlerFactory).to.have.property('wrapPromiseMethod').that.is.a('function');
        });
    });

    describe('behavior', () => {

        describe('Handler class', () => {

            it('should throw an error in case of undefined/null handler', async () => {

                try {
                    new HandlerFactory.Handler<number, number>();
                    throw new Error('UnexpectedError');
                }
                catch (err) {

                    expect(err).to.have.property('message').that.is.eq('No handler is defined.');
                }
            });

            it('should invoke the method using callback', (cb) => {

                new HandlerFactory.Handler<number, number>(
                    async (n: number): Promise<number> => n * 2
                )
                    .run(10, (err, result) => {

                        if (err) { return cb(err); }

                        try {

                            expect(result).to.be.a('number').that.is.eq(20);
                            return cb();
                        }
                        catch (err) {

                            return cb(err);
                        }
                    });
            });

            it('should invoke the method using promise', async () => {

                const instance = new HandlerFactory.Handler<number, number>(
                    async (n: number): Promise<number> => n * 2
                );

                const result = await instance.runAsync(10);
                expect(result).to.be.a('number').that.is.eq(20);
            });
        });

        describe('wrapAsyncMethod', () => {

            it('should invoke the method using callback', (cb) => {

                HandlerFactory.wrapAsyncMethod<number, number>(
                    async (n: number): Promise<number> => n * 2
                )
                    .run(10, (err, result) => {

                        if (err) { return cb(err); }

                        try {

                            expect(result).to.be.a('number').that.is.eq(20);
                            return cb();
                        }
                        catch (err) {

                            return cb(err);
                        }
                    });
            });

            it('should invoke the method using promise', async () => {

                const instance = HandlerFactory.wrapAsyncMethod<number, number>(
                    async (n: number): Promise<number> => n * 2
                );

                const result = await instance.runAsync(10);
                expect(result).to.be.a('number').that.is.eq(20);
            });

        });

        describe('wrapCallbackMethod', () => {

            it('should invoke the method using callback', (cb) => {

                HandlerFactory.wrapCallbackMethod<number, number>(
                    (n, cb) => cb(null, n * 2)
                )
                    .run(10, (err, result) => {

                        if (err) { return cb(err); }

                        try {

                            expect(result).to.be.a('number').that.is.eq(20);
                            return cb();
                        }
                        catch (err) {

                            return cb(err);
                        }
                    });
            });

            it('should invoke the method using promise', async () => {

                const instance = HandlerFactory.wrapCallbackMethod<number, number>(
                    (n, cb) => cb(null, n * 2)
                );

                const result = await instance.runAsync(10);
                expect(result).to.be.a('number').that.is.eq(20);
            });

        });

        describe('wrapPromiseMethod', () => {

            it('should invoke the method using callback', (cb) => {

                HandlerFactory.wrapPromiseMethod<number, number>(
                    async (n: number): Promise<number> => n * 2
                )
                    .run(10, (err, result) => {

                        if (err) { return cb(err); }

                        try {

                            expect(result).to.be.a('number').that.is.eq(20);
                            return cb();
                        }
                        catch (err) {

                            return cb(err);
                        }
                    });
            });

            it('should invoke the method using promise', async () => {

                const instance = HandlerFactory.wrapPromiseMethod<number, number>(
                    async (n: number): Promise<number> => n * 2
                );

                const result = await instance.runAsync(10);
                expect(result).to.be.a('number').that.is.eq(20);
            });

        });
    });
});