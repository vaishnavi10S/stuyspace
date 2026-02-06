import type { DomMeta, HookMap, HighlighterOptions } from './types';
import EventEmitter from './util/event.emitter';
import HighlightSource from './model/source';
import Cache from './data/cache';
import Painter from './painter';
import { EventType, CreateFrom } from './types';
interface EventHandlerMap {
    [key: string]: (...args: any[]) => void;
    [EventType.CLICK]: (data: {
        id: string;
    }, h: Highlighter, e: MouseEvent | TouchEvent) => void;
    [EventType.HOVER]: (data: {
        id: string;
    }, h: Highlighter, e: MouseEvent | TouchEvent) => void;
    [EventType.HOVER_OUT]: (data: {
        id: string;
    }, h: Highlighter, e: MouseEvent | TouchEvent) => void;
    [EventType.CREATE]: (data: {
        sources: HighlightSource[];
        type: CreateFrom;
    }, h: Highlighter) => void;
    [EventType.REMOVE]: (data: {
        ids: string[];
    }, h: Highlighter) => void;
}
export default class Highlighter extends EventEmitter<EventHandlerMap> {
    static event: typeof EventType;
    static isHighlightWrapNode: ($node: HTMLElement) => boolean;
    hooks: HookMap;
    painter: Painter;
    cache: Cache;
    private _hoverId;
    private options;
    private readonly event;
    constructor(options?: HighlighterOptions);
    static isHighlightSource: (d: any) => boolean;
    run: () => () => void;
    stop: () => void;
    addClass: (className: string, id?: string) => void;
    removeClass: (className: string, id?: string) => void;
    getIdByDom: ($node: HTMLElement) => string;
    getExtraIdByDom: ($node: HTMLElement) => string[];
    getDoms: (id?: string) => HTMLElement[];
    dispose: () => void;
    setOption: (options?: HighlighterOptions) => void;
    fromRange: (range: Range) => HighlightSource;
    fromStore: (start: DomMeta, end: DomMeta, text: string, id: string, extra?: unknown) => HighlightSource;
    remove(id: string): void;
    removeAll(): void;
    private readonly _getHooks;
    private readonly _highlightFromHRange;
    private _highlightFromHSource;
    private readonly _handleSelection;
    private readonly _handleHighlightHover;
    private readonly _handleError;
    private readonly _handleHighlightClick;
}
export {};
