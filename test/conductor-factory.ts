/**
 * conductor-factory
 */

import { expect } from 'chai';

import { ConductorBuilder } from '../src/conductor-builder';
import { wrapAsyncMethod } from '../src/handler-factory';

describe('conductor-factory', () => {

    describe('integrity', () => {

        it('module should be constantly fixed', () => {

            expect(ConductorBuilder).to.be.a('function');
        });

        it('should contain two methods in the instance', () => {

            const instance = new ConductorBuilder();

            expect(instance).to.have.property('handle').that.is.a('function');
            expect(instance).to.have.property('toConductor').that.is.a('function');
        });
    });

    describe('behavior', () => {

        describe('handle', () => {

            it('should throw exception if handler is undefined', async () => {

                const factory = new ConductorBuilder();

                try {

                    factory.handle();
                    throw new Error('UnexpectedError');
                }
                catch (err) {
                    expect(err).to.have.have.property('message').that.is.eq('No handler is provided.');
                }
            });

            it('should add handler without error', async () => {

                const factory = new ConductorBuilder();

                factory.handle<number, number>(wrapAsyncMethod(async (n) => n * 2));
                const conductor = factory.toConductor();

                const result = await conductor.runAsync<number, number>(10);

                expect(result).to.be.a('number').that.is.eq(20);
            });
        });

        describe('toConductor', () => {

            it('should throw error in case of empty handler', async () => {

                const factory = new ConductorBuilder();

                try {

                    factory.handle();
                    throw new Error('UnexpectedError');
                }
                catch (err) {
                    expect(err).to.have.have.property('message').that.is.eq('No handler is provided.');
                }
            });
        });
    });
});