export interface CenterLayoutAttributes {
    max?: string;
    gutters?: string;
    intrinsic?: boolean;
}
declare const CenterLayout_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * CenterLayout ensures a block-level element is horizontally centered with a max-width value representing the typographic measure
 *
 * @property {string} max=var(--measure) A CSS `max-width` value
 * @property {string} gutters=null A CSS `length` value representing the minimum space on either side of the content
 * @property {boolean} intrinsic=false Center child elements based on their content width
 */
export declare class CenterLayout extends CenterLayout_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    static getStyles(attrs: CenterLayoutAttributes): {
        id: string;
        css: string;
    };
    get max(): string;
    set max(value: string);
    get gutters(): string | undefined;
    set gutters(value: string | undefined);
    get intrinsic(): boolean;
    set intrinsic(value: boolean);
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export {};
