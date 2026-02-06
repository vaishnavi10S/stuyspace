import type { RootElement } from '../types';
/**
 * whether a wrapper node
 */
export declare const isHighlightWrapNode: ($node: HTMLElement) => boolean;
/**
 * get highlight id by a node
 */
export declare const getHighlightId: ($node: HTMLElement, $root: RootElement) => string;
/**
 * get extra highlight id by a node
 */
export declare const getExtraHighlightId: ($node: HTMLElement, $root: RootElement) => string[];
/**
 * get all highlight wrapping nodes nodes from a root node
 */
export declare const getHighlightsByRoot: ($roots: RootElement | RootElement[], wrapTag: string) => HTMLElement[];
/**
 * get all highlight wrapping nodes by highlight id from a root node
 */
export declare const getHighlightById: ($root: RootElement, id: string, wrapTag: string) => HTMLElement[];
export declare const forEach: ($nodes: NodeList, cb: (n: Node, idx: number, s: NodeList) => void) => void;
export declare const removeEventListener: ($el: RootElement, evt: string, fn: EventListenerOrEventListenerObject) => void;
/**
 * maybe be need some polyfill methods later
 * provide unified dom methods for compatibility
 */
export declare const addEventListener: ($el: RootElement, evt: string, fn: EventListenerOrEventListenerObject) => () => void;
export declare const addClass: ($el: HTMLElement, className: string[] | string) => void;
export declare const removeClass: ($el: HTMLElement, className: string) => void;
export declare const removeAllClass: ($el: HTMLElement) => void;
export declare const hasClass: ($el: HTMLElement, className: string) => boolean;
