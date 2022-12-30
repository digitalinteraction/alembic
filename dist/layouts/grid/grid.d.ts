export interface GridLayoutAttributes {
    min?: string;
    space?: string;
}
declare const GridLayout_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * GridLayout creates a responsive grid using CSS Grid
 *
 * @property {string} min=250px A CSS `length` for the x in `minmax(min(x, 100%), 1fr)`
 * @property {string} space=var(--s1) The space between grid cells
 */
export declare class GridLayout extends GridLayout_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    static getStyles(attrs: GridLayoutAttributes): {
        id: string;
        css: string;
    };
    get min(): string;
    set min(value: string);
    get space(): string;
    set space(value: string);
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export {};
