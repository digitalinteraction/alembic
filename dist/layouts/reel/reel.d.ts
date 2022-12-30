export interface ReelLayoutAttributes {
    itemWidth?: string;
    height?: string;
    space?: string;
    noBar?: boolean;
}
declare const ReelLayout_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * ReelLayout places elements horizontally and facilitates scrolling overflow
 *
 * @property {string} itemWidth=auto The width of each element
 * @property {string} space=var(--s0) The space between each element
 * @property {string} height=auto The height of the ReelLayout itself
 * @property {boolean} noBar=false Whether to hide the scrollbar
 */
export declare class ReelLayout extends ReelLayout_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    static getStyles(attrs: ReelLayoutAttributes): {
        id: string;
        css: string;
    };
    get itemWidth(): string;
    set itemWidth(value: string);
    get height(): string;
    set height(value: string);
    get space(): string;
    set space(value: string);
    get noBar(): boolean;
    set noBar(value: boolean);
    toggleOverflowClass(elem: Element): void;
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export {};
