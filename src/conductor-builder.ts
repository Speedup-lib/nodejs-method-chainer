/**
 * Conductor Factory
 */

import { HandlerBase } from './type/handler';
import { Conductor } from './conductor';

export class ConductorBuilder {

    private readonly handlers: Array<HandlerBase<any, any>> = [];

    /**
     * Add handler to the chain
     * @param handler Handler
     */
    handle<TInput, TOutput>(handler?: HandlerBase<TInput, TOutput>) {

        if (!handler) { throw new Error('No handler is provided.'); }

        this.handlers.push(handler);

        return <T>(handler: HandlerBase<TOutput, T>) => this.handle<TOutput, T>(handler);
    }

    /**
     * Create conductor from builder
     */
    toConductor() {
        return new Conductor([...this.handlers]);
    }
}
