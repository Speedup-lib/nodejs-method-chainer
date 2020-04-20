/**
 * Conductor Factory
 */

import IHandler from './type/handler';
import Conductor from './conductor';

class ConductorFactory {

    private readonly handlers: Array<IHandler<any, any>> = [];

    /**
     * Add handler to the chain
     * @param handler Handler
     */
    handle<TInput, TOutput>(handler: IHandler<TInput, TOutput>) {

        this.handlers.push(handler);

        return <T>(handler: IHandler<TOutput, T>) => this.handle<TOutput, T>(handler);
    }

    /**
     * Create conductor from factory
     */
    toConductor() {
        return new Conductor([...this.handlers]);
    }
}

const create = <TInput, TOutput>() => new ConductorFactory();

export { ConductorFactory, create };