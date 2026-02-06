/**
 * the HighlightRange Class（HRange）
 * It's a special object called HRange in Highlighter,
 * represents for a piece of chosen dom
 */
import type { DomNode, HookMap } from '../../types';
import type Hook from '../../util/hook';
import HighlightSource from '../source/index';
declare class HighlightRange {
    static removeDomRange: () => void;
    start: DomNode;
    end: DomNode;
    text: string;
    id: string;
    frozen: boolean;
    constructor(start: DomNode, end: DomNode, text: string, id: string, frozen?: boolean);
    static fromSelection(idHook: Hook<string>): HighlightRange;
    serialize($root: Document | HTMLElement, hooks: HookMap): HighlightSource;
}
export default HighlightRange;
