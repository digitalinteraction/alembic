export interface BoxLayoutAttributes {
    padding?: string;
    borderWidth?: string;
    invert?: boolean;
}
declare const BoxLayout_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * BoxLayout is a custom element for generic containers of things
 *
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {boolean} invert=false Whether to flip fore/background colours
 */
export declare class BoxLayout extends BoxLayout_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    static getStyles(attrs: BoxLayoutAttributes): {
        id: string;
        css: string;
    };
    get padding(): string;
    set padding(value: string);
    get borderWidth(): string;
    set borderWidth(value: string);
    get invert(): boolean;
    set invert(value: boolean);
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export {};
