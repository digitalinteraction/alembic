export interface SwitcherLayoutAttributes {
    threshold?: string;
    space?: string;
    limit?: string;
}
declare const SwitcherLayout_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * SwitcherLayout places elements horizontally if there is space, or vertically if not
 *
 * @property {string} threshold=var(--measure) A CSS `width` for the 'container breakpoint'
 * @property {string} space=var(--s1) A CSS `margin` for the gap between elements
 * @property {integer} limit=4 The maximum number of elements allowed to display horizontally
 */
export declare class SwitcherLayout extends SwitcherLayout_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    static getStyles(attrs: SwitcherLayoutAttributes): {
        id: string;
        css: string;
    };
    get threshold(): string;
    set threshold(value: string);
    get space(): string;
    set space(value: string);
    get limit(): string;
    set limit(value: string);
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export {};
