import type { DomNode } from '@src//types';
import type HighlightSource from './index';
/**
 * Because of supporting highlighting a same area (range overlapping),
 * Highlighter will calculate which text-node and how much offset it actually be,
 * based on the origin website dom node and the text offset.
 *
 * @param {Node} $parent element node in the origin website dom tree
 * @param {number} offset text offset in the origin website dom tree
 * @return {DomNode} DOM a dom info object
 */
export declare const getTextChildByOffset: ($parent: Node, offset: number) => DomNode;
/**
 * get start and end parent element from meta info
 *
 * @param {HighlightSource} hs
 * @param {HTMLElement | Document} $root root element, default document
 * @return {Object}
 */
export declare const queryElementNode: (hs: HighlightSource, $root: Document | HTMLElement) => {
    start: Node;
    end: Node;
};
