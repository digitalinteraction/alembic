/**
  Create a global stylesheet under an identifier so it is only added once.
  If a style with the same id is requested again, it will not be added.
 */
export declare function addGlobalStyle(id: string, style: string): void;
/**
  Trim all the whitespace from a CSS template literal.
 */
export declare function trimCss(strings: TemplateStringsArray, ...args: unknown[]): string;
/** @experimental */
export declare class AlembicStyleSheet {
    #private;
    reset(): void;
    getStyles(): Map<string, string>;
    addStyle({ id, css }: {
        id: string;
        css: string;
    }): string;
    [Symbol.iterator](): Generator<string[], void, unknown>;
}
