export interface ProcessHtmlOptions {
    extraStyles?: string[];
    extraScripts?: string[];
}
export declare function processHtml(inputHtml: string, options?: ProcessHtmlOptions): string;
export declare function getStyles(inputHtml: string): Map<string, unknown>;
export declare function getBaseStyles(): string;
export declare function getBaseScripts(): string;
export declare function _iterateElements<T>(html: string, elements: Map<string, T>): Generator<readonly [RegExpMatchArray, T], void, unknown>;
export declare function _createStyle(id: string, css: string): string;
export declare function _recreateElement(name: string, attrs: string, id: string): string;
export declare function _parseHtmlAttributes(attrs: string): Record<string, string>;
export declare function _elementRegex(name: string): RegExp;
export declare function _commentRegex(name: string): RegExp;
