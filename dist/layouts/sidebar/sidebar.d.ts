export interface SidebarLayoutAttributes {
    side?: string;
    sideWidth?: string;
    contentMin?: string;
    space?: string;
    noStretch?: boolean;
}
declare const SidebarLayout_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * SidebarLayout places two elements side-by-side. If space permits it, the sidebar has a set width and the content fills up the rest of the space. If there is not enough space, the elements collapse into a single column, taking up all of the horizontal space.
 *
 * @property {string} side=left Which side to put the sidebar on, only "right" or "left" are allowed.
 * @property {string} sideWidth=null A CSS `length`, for the sidebar's width. If `null` use the intrinsic content width.
 * @property {string} contentMin=50% A CSS `percentage`, representing the minimum horizontal width of the content element.
 * @property {string} space=var(--s1) A CSS `gap` of space between the sidebar and content.
 * @property {boolean} noStretch=false Keep the sidebar and content their natural height
 */
export declare class SidebarLayout extends SidebarLayout_base {
    static get observedAttributes(): string[];
    static defineElement(): void;
    static getStyles(attrs: SidebarLayoutAttributes): {
        id: string;
        css: string;
    };
    get side(): string;
    set side(value: string);
    get sideWidth(): string | undefined;
    set sideWidth(value: string | undefined);
    get contentMin(): string;
    set contentMin(value: string);
    get space(): string;
    set space(value: string);
    get noStretch(): boolean;
    set noStretch(value: boolean);
    render(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export {};
