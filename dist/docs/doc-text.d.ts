export interface DocTextAttributes {
    words?: string;
}
export declare class DocText extends HTMLElement {
    textNode: Text;
    static get observedAttributes(): string[];
    get words(): string;
    set words(value: string);
    constructor();
    randomNumber(min: number, max: number): number;
    sentenceCase(input: string): string;
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
