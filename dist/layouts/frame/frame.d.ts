export interface FrameLayoutAttributes {
    ratio?: string;
}
declare const FrameLayout_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * FrameLayout displays an element with an aspect ratio
 *
 * @property {string} ratio=16:9 The element's aspect ratio
 */
export declare class FrameLayout extends FrameLayout_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    static getStyles(attrs: FrameLayoutAttributes): {
        id: string;
        css: string;
    };
    get ratio(): string;
    set ratio(value: string);
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export {};
