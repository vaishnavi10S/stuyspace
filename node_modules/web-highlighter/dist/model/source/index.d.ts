/**
 * HighlightSource Class (HSource)
 * This Object can be deSerialized to HRange.
 * Also it has the ability for persistence.
 */
import type { DomMeta, HookMap } from '../../types';
import HighlightRange from '../range/index';
declare class HighlightSource {
    startMeta: DomMeta;
    endMeta: DomMeta;
    text: string;
    id: string;
    extra?: unknown;
    __isHighlightSource: unknown;
    constructor(startMeta: DomMeta, endMeta: DomMeta, text: string, id: string, extra?: unknown);
    deSerialize($root: Document | HTMLElement, hooks: HookMap): HighlightRange;
}
export default HighlightSource;
