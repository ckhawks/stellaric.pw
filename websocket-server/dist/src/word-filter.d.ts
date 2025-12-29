export declare class WordFilter {
    private blocklist;
    constructor(customBlocklist?: string[]);
    containsBlockedWord(message: string): boolean;
    addWord(word: string): void;
    removeWord(word: string): void;
    getBlocklist(): string[];
}
//# sourceMappingURL=word-filter.d.ts.map