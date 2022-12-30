export interface StackLayoutAttributes {
    space?: string;
}
declare const StackLayout_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * StackLayout adds whitespace (margin) between flow (block) elements along a vertical axis
 *
 * @property {string} space=var(--s1) A CSS `margin` value
 */
export declare class StackLayout extends StackLayout_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    static getStyles(attrs: StackLayoutAttributes): {
        id: string;
        css: string;
    };
    get space(): string;
    set space(value: string);
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export {};
