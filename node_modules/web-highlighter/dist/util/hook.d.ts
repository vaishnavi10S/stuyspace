/**
 * simple hook
 * webpack-plugin-liked api
 */
declare type HookCallback<T> = (...args: unknown[]) => T;
declare class Hook<T = unknown> {
    name: string;
    private readonly ops;
    constructor(name?: any);
    tap(cb: HookCallback<T>): () => void;
    remove(cb: HookCallback<T>): void;
    isEmpty(): boolean;
    call(...args: unknown[]): T;
}
export default Hook;
