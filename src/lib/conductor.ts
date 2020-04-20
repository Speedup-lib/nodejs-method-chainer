/**
 * Conductor
 */

import IHandler from './type/handler';

class Conductor {

    private readonly handlers: Array<IHandler<any, any>>;

    constructor(handlers: Array<IHandler<any, any>>) {

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

        // THIS LOOP DOESN'T WORK
        return await this.handlers.reduce(
            async (input: any, handler) => await handler.runAsync(input),
            input
        );
    }
}

export default Conductor;