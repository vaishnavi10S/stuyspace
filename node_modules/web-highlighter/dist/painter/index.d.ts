/**
 * Painter object is designed for some painting work about higlighting,
 * including rendering, cleaning...
 * No need to instantiate repeatly. A Highlighter instance will bind a Painter instance.
 */
import type HighlightRange from '../model/range';
import type { PainterOptions, HookMap } from '../types';
import HighlightSource from '../model/source';
export default class Painter {
    options: PainterOptions;
    $style: HTMLStyleElement;
    styleId: string;
    hooks: HookMap;
    constructor(options: PainterOptions, hooks: HookMap);
    highlightRange(range: HighlightRange): HTMLElement[];
    highlightSource(sources: HighlightSource | HighlightSource[]): HighlightSource[];
    removeHighlight(id: string): boolean;
    removeAllHighlight(): void;
}
