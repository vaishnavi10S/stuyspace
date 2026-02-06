import type HighlightRange from '../model/range';
import type { SelectedNode, DomNode } from '../types';
/**
 * get all the dom nodes between the start and end node
 */
export declare const getSelectedNodes: ($root: Document | HTMLElement, start: DomNode, end: DomNode, exceptSelectors: string[]) => SelectedNode[];
/**
 * wrap a dom node with highlight wrapper
 *
 * Because of supporting the highlight-overlapping,
 * Highlighter can't just wrap all nodes in a simple way.
 * There are three types:
 *  - wrapping a whole new node (without any wrapper)
 *  - wrapping part of the node
 *  - wrapping the whole wrapped node
 */
export declare const wrapHighlight: (selected: SelectedNode, range: HighlightRange, className: string[] | string, wrapTag: string) => HTMLElement;
/**
 * merge the adjacent text nodes
 * .normalize() API has some bugs in IE11
 */
export declare const normalizeSiblingText: ($s: Node, isNext?: boolean) => void;
