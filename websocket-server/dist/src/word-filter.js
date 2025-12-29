"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordFilter = void 0;
class WordFilter {
    constructor(customBlocklist) {
        this.blocklist = [
        // Add blocked words here (case-insensitive)
        // These are just placeholders - customize as needed
        ];
        if (customBlocklist) {
            this.blocklist = customBlocklist;
        }
    }
    containsBlockedWord(message) {
        if (this.blocklist.length === 0) {
            return false;
        }
        const lowerMessage = message.toLowerCase();
        return this.blocklist.some((word) => {
            const lowerWord = word.toLowerCase();
            return lowerMessage.includes(lowerWord);
        });
    }
    addWord(word) {
        if (!this.blocklist.includes(word.toLowerCase())) {
            this.blocklist.push(word.toLowerCase());
        }
    }
    removeWord(word) {
        const lowerWord = word.toLowerCase();
        this.blocklist = this.blocklist.filter((w) => w !== lowerWord);
    }
    getBlocklist() {
        return [...this.blocklist];
    }
}
exports.WordFilter = WordFilter;
//# sourceMappingURL=word-filter.js.map