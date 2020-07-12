/**
 * Conductor
 */

import Async from 'async';

import { HandlerBase } from './type/handler';

export class Conductor {

    private readonly handlers: Array<HandlerBase<any, any>>;

    constructor(handlers: Array<HandlerBase<any, any>>) {

        if (!handlers || !Array.isArray(handlers) || handlers.length < 1) {
            throw new Error('No handler is defined.');
        }

        this.handlers = handlers;
    }

    /**
     * Run the chain using callbacks
     * @param input Input parameter(s)
     * @param callback Callback method
     */
    run<TInput, TOutput>(input: TInput, callback: (err?: Error, result?: TOutput) => void) {

        this.runAsync<TInput, TOutput>(input)
            .then((result: TOutput) => callback(undefined, result))
            .catch((err: Error) => callback(err));
    }

    /**
     * Run the chain asynchronously
     * @param input Input parameter(s)
     */
    async runAsync<TInput, TOutput>(input: TInput): Promise<TOutput> {

        return new Promise<TOutput>((resolve, reject) => {

            Async.reduce<HandlerBase<TInput, TOutput>, any>(
                this.handlers,
                input,
                (input, handler, cb) => handler.runAsync(input).then(result => cb(null, result)).catch(cb),
                (err, result: TOutput) => {

                    if (err) { return reject(err); }

                    return resolve(result);
                }
            );
        });
    }
}
