/**
 * Handler
 */

interface IHandler<TInput, TOutput> {

    /**
     * Run handler using callback
     * @param input Input parameter
     * @param callback Callback method
     */
    run(input: TInput, callback: (err?: Error, result?: TOutput) => void): void;

    /**
     * Run handler asynchronously
     * @param input Input parameter
     */
    runAsync(input: TInput): Promise<TOutput>;
}



export default IHandler;