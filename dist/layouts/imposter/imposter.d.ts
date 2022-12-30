export interface ImposterLayoutAttributes {
    breakout?: boolean;
    fixed?: boolean;
    margin?: string;
}
declare const ImposterLayout_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * ImposterLayout positions an element over any other element
 *
 * @property {boolean} breakout=false ...
 * @property {string} margin=0 The minimum space between the element and it's positioning container (when `breakout` isn't used)
 * @property {boolean} fixed=false Whether to fix the element to the viewport instead
 */
export declare class ImposterLayout extends ImposterLayout_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    static getStyles(attrs: ImposterLayoutAttributes): {
        id: string;
        css: string;
    };
    get breakout(): boolean;
    set breakout(value: boolean);
    get fixed(): boolean;
    set fixed(value: boolean);
    get margin(): string;
    set margin(value: string);
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export {};
