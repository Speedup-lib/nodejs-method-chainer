/**
 * Handler factory
 */

import { promisify } from 'util';

export type RequestHandler<TInput, TOutput> = (input: TInput) => Promise<TOutput>;

export class Handler<TInput, TOutput> implements Handler<TInput, TOutput> {

    private readonly handler: RequestHandler<TInput, TOutput>;

    constructor(handler?: RequestHandler<TInput, TOutput>) {

        if (!handler) { throw new Error('No handler is defined.'); }

        this.handler = handler;
    }

    /**
     * Run the handler using callback-style with the desired input
     * @param input Input for the function
     * @param callback Result's callback
     */
    run(input: TInput, callback: (err?: Error | undefined, result?: TOutput | undefined) => void): void {

        this.runAsync(input)
            .then((result: TOutput) => callback(undefined, result))
            .catch((err: Error) => callback(err));
    }

    /**
     * Run the handler asynchronously with the desired input
     * @param input Input for the function
     */
    async runAsync(input: TInput): Promise<TOutput> {

        return await this.handler(input);
    }
}

/**
 * Wrap your callback-based method
 * @param fn Callback-based method
 */
export const wrapCallbackMethod = <TInput, TOutput>(fn: (input: TInput, callback: (err: any, result: TOutput) => void) => void) => new Handler<TInput, TOutput>(promisify<TInput, TOutput>(fn));

/**
 * Wrap your promise-based method
 * @param fn Promise-based method
 */
export const wrapPromiseMethod = <TInput, TOutput>(fn: (input: TInput) => Promise<TOutput>) => new Handler<TInput, TOutput>(fn);

/**
 * Wrap your modern async/await method
 * @param fn Async/await method
 */
export const wrapAsyncMethod = <TInput, TOutput>(fn: (input: TInput) => Promise<TOutput>) => new Handler<TInput, TOutput>(fn);

/**
 * Wrap your synchronous method
 * @param fn Synchronous method
 */
export const wrapSyncMethod = <TInput, TOutput>(fn: (input: TInput) => TOutput): Handler<TInput, TOutput> =>
    wrapAsyncMethod<TInput, TOutput>(
        async (input: TInput): Promise<TOutput> => {

            try {
                const result = fn(input);
                return Promise.resolve(result);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
    );
