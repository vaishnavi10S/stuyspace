/**
 * tiny event emitter
 * modify from mitt
 */
declare type EventHandler = (...data: unknown[]) => void;
declare type EventMap = Record<string, EventHandler>;
declare class EventEmitter<U extends EventMap = EventMap> {
    private handlersMap;
    on<T extends keyof U>(type: T, handler: U[T]): this;
    off<T extends keyof U>(type: T, handler: U[T]): this;
    emit<T extends keyof U>(type: T, ...data: Parameters<U[T]>): this;
}
export default EventEmitter;
