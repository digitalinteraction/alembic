export interface IconLayoutAttributes {
    space?: string;
    label?: string;
}
declare const IconLayout_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * IconLayout lays out icons inline nicely
 *
 * @property {string} space=null The space between the text and the icon. If null, the natural word spacing is preserved.
 * @property {string} label=null Turns the element into an image for assistive technologies and sets aria-label to the value.
 */
export declare class IconLayout extends IconLayout_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    static getStyles(attrs: IconLayoutAttributes): {
        id: string;
        css: string;
    };
    get space(): string | undefined;
    set space(value: string | undefined);
    get label(): string | undefined;
    set label(value: string | undefined);
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export {};
