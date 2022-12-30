interface EleventyEventArgs {
    dir: {
        input: string;
        output: string;
    };
}
export interface EleventyConfig {
    addTransform(name: string, callback: (content: string) => unknown): void;
    on(eventName: 'eleventy.after', callback: (args: EleventyEventArgs) => unknown): void;
    dir: Partial<Record<string, string>>;
}
export declare function eleventyAlembic(eleventyConfig: EleventyConfig): void;
export {};
