import { DetailsUtils } from './details-utils.js';
export interface DocSectionAttributes {
    label?: string;
    prefix?: string;
}
export declare class DocSection extends HTMLElement {
    get label(): string;
    get prefix(): string;
    get detailsUtilsElem(): DetailsUtils;
    get labelElem(): Element;
    constructor();
    render(): void;
    connectedCallback(): void;
    toggleOpen(force: boolean): void;
    getSlug(input?: string): string;
}
