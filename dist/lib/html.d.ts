export declare function getHTMLElement(): typeof HTMLElement;
export interface AlembicHTMLElement<T extends HTMLElement = HTMLElement, P extends Record<string, unknown> = Record<string, unknown>> {
    getStyles(attrs: P): {
        id: string;
        css: string;
    };
    new (): T;
}
export declare function defineCustomElements(map: Map<string, CustomElementConstructor>): void;
