/**
 * conductor
 */

import { expect } from 'chai';

import { Conductor } from '../src/conductor';
import { wrapAsyncMethod } from '../src/handler-factory';

describe('conductor', () => {

    describe('integrity', () => {

        it('module should be constantly fixed', () => {

            expect(Conductor).to.be.a('function');
        });

        it('should contain two methods in the instance', () => {

            const instance = new Conductor([
                wrapAsyncMethod(async (n) => n * 2)
            ]);

            expect(instance).to.have.property('run').that.is.a('function');
            expect(instance).to.have.property('runAsync').that.is.a('function');
        });

        it('should throw exception if no handler is defined', () => {

            try {

                new Conductor([]);
                throw new Error('UnexpectedError');
            }
            catch (err) {

                expect(err).to.have.property('message').that.is.eq('No handler is defined.');
            }
        });
    });

    describe('behavior', () => {

        describe('run', () => {

            it('should run the correct result', (cb) => {

                const conductor = new Conductor([
                    wrapAsyncMethod(async (n) => n * 2)
                ]);

                conductor.run<number, number>(
                    2,
                    (err, result) => {
                        if (err) { return cb(err); }

                        try {

                            expect(result).to.be.a('number').that.is.eq(4);
                            return cb();
                        }
                        catch (err) {

                            cb(err);
                        }
                    }
                );
            });

            it('should throw an error', (cb) => {

                const conductor = new Conductor([
                    wrapAsyncMethod(async (n) => { throw new Error('HandledError'); })
                ]);

                conductor.run<number, number>(
                    2,
                    (err, result) => {
                        if (!err) { return cb(new Error('UnhandledException')); }

                        try {

                            expect(err).to.have.property('message').that.is.eq('HandledError');
                            return cb();
                        }
                        catch (err) {

                            cb(err);
                        }
                    }
                );
            });
        });

        describe('runAsync', () => {

            it('should run the correct result', async () => {

                const conductor = new Conductor([
                    wrapAsyncMethod(async (n) => n * 2)
                ]);

                const result = await conductor.runAsync<number, number>(2);
                expect(result).to.be.a('number').that.is.eq(4);
            });

            it('should throw an error', async () => {

                const conductor = new Conductor([
                    wrapAsyncMethod(async (n) => { throw new Error('HandledError'); })
                ]);

                try {

                    await conductor.runAsync<number, number>(2);
                    throw new Error('UnexpectedError');
                }
                catch (err) {
                    expect(err).to.have.property('message').that.is.eq('HandledError');
                }
            });

        });
    });
});