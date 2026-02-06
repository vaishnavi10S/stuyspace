import EventEmitter from '../util/event.emitter';
import type HighlightSource from '../model/source';
declare class Cache extends EventEmitter {
    private _data;
    get data(): HighlightSource[];
    set data(map: HighlightSource[]);
    save(source: HighlightSource | HighlightSource[]): void;
    get(id: string): HighlightSource;
    remove(id: string): void;
    getAll(): HighlightSource[];
    removeAll(): string[];
}
export default Cache;
