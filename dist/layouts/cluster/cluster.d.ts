export interface ClusterLayoutAttributes {
    justify?: string;
    align?: string;
    space?: string;
}
declare const ClusterLayout_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * ClusterLayout groups items together with control for the margin between them
 *
 * NOTE — if flex-gap isn't supported, items will appear flush
 *
 * @property {string} justify=flex-start A CSS `justify-content` value
 * @property {string} align=flex-start A CSS `align-items` value
 * @property {string} space=var(--s1) A CSS `gap` value. The minimum space between the clustered child elements.
 */
export declare class ClusterLayout extends ClusterLayout_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    static getStyles(attrs: ClusterLayoutAttributes): {
        id: string;
        css: string;
    };
    get justify(): string;
    set justify(value: string);
    get align(): string;
    set align(value: string);
    get space(): string;
    set space(value: string);
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export {};
