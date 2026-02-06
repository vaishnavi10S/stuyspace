interface Deferred<T> {
    promise: Promise<T>;
    resolve: (args: T) => unknown;
    reject: (e?: unknown) => unknown;
}
export default function getDeferred<T>(): Deferred<T>;
export declare const resolve: <T>(data: any) => Promise<T>;
export declare const reject: <T>(data: any) => Promise<T>;
export {};
