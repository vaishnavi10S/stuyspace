/**
 * all constants
 * cSpell:ignore mengshou
 */
import type HighlightSource from '../model/source';
import type { ERROR } from '../types';
import EventEmitter from './event.emitter';
export declare const ID_DIVISION = ";";
export declare const LOCAL_STORE_KEY = "highlight-mengshou";
export declare const STYLESHEET_ID = "highlight-mengshou-style";
export declare const DATASET_IDENTIFIER = "highlight-id";
export declare const DATASET_IDENTIFIER_EXTRA = "highlight-id-extra";
export declare const DATASET_SPLIT_TYPE = "highlight-split-type";
export declare const CAMEL_DATASET_IDENTIFIER: string;
export declare const CAMEL_DATASET_IDENTIFIER_EXTRA: string;
export declare const CAMEL_DATASET_SPLIT_TYPE: string;
export declare const getDefaultOptions: () => {
    $root: HTMLElement | Document;
    exceptSelectors: any;
    wrapTag: string;
    verbose: boolean;
    style: {
        className: string;
    };
};
export declare const getStylesheet: () => string;
export declare const ROOT_IDX = -2;
export declare const UNKNOWN_IDX = -1;
export declare const INTERNAL_ERROR_EVENT = "error";
interface EventHandlerMap {
    [key: string]: (...args: any[]) => void;
    error: (data: {
        type: ERROR;
        detail?: HighlightSource;
        error?: any;
    }) => void;
}
declare class ErrorEventEmitter extends EventEmitter<EventHandlerMap> {
}
export declare const eventEmitter: ErrorEventEmitter;
export {};
