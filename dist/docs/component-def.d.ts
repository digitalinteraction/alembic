export interface ComponentDefAttributes {
    label?: string;
    noPad?: boolean;
}
export declare class ComponentDef extends HTMLElement {
    static get observedAttributes(): string[];
    get label(): string;
    get noPad(): boolean;
    set noPad(value: boolean);
    constructor();
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
    renderCode(html: string): string;
}
