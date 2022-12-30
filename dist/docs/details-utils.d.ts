export interface DetailsUtilsAttributes {
    persist?: string;
}
declare const DetailsUtils_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
export declare class DetailsUtils extends DetailsUtils_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    get detailsElem(): HTMLDetailsElement | null;
    get persist(): string | undefined;
    set persist(value: string | undefined);
    constructor();
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
    toggleOpen(force?: boolean): void;
}
export {};
