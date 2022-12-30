export interface CoverLayoutAttributes {
    centered?: string;
    space?: string;
    minHeight?: string;
    noPad?: boolean;
}
declare const CoverLayout_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * CoverLayout covers a block-layout element vertically with a centered principle element
 * and accessory elements at the top or bottom
 *
 * @property {string} centered=h1 A CSS `selector` e.g. an element/class for the principle element
 * @property {string} space=var(--s1) The minimum space between all child elements
 * @property {string} minHeight=100vh The minimum block-size (height) for the entire layout
 * @property {boolean} noPad=false Whether the spacing should also pad the inside of the layout
 */
export declare class CoverLayout extends CoverLayout_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    static getStyles(attrs: CoverLayoutAttributes): {
        id: string;
        css: string;
    };
    get centered(): string;
    set centered(value: string);
    get space(): string;
    set space(value: string);
    get minHeight(): string;
    set minHeight(value: string);
    get noPad(): boolean;
    set noPad(value: boolean);
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export {};
