export interface DocBoxAttributes {
    height?: string;
    width?: string;
    pattern?: 'a' | 'b' | 'c';
}
/**
 * `DocBox` is a coloured box to represent content while demonstrating a layout
 */
export declare class DocBox extends HTMLElement {
    static get observedAttributes(): string[];
    get height(): string | undefined;
    set height(value: string | undefined);
    get width(): string | undefined;
    set width(value: string | undefined);
    get pattern(): string;
    set pattern(value: string);
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
