/**
 * some dom operations about HighlightRange
 */
import type { DomMeta, DomNode } from '../../types';
export declare const getDomMeta: ($node: HTMLElement | Text, offset: number, $root: Document | HTMLElement) => DomMeta;
export declare const formatDomNode: (n: DomNode) => DomNode;
