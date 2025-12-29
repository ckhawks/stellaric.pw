export class WordFilter {
  private blocklist: string[] = [
    // Add blocked words here (case-insensitive)
    // These are just placeholders - customize as needed
  ];

  constructor(customBlocklist?: string[]) {
    if (customBlocklist) {
      this.blocklist = customBlocklist;
    }
  }

  containsBlockedWord(message: string): boolean {
    if (this.blocklist.length === 0) {
      return false;
    }

    const lowerMessage = message.toLowerCase();
    return this.blocklist.some((word) => {
      const lowerWord = word.toLowerCase();
      return lowerMessage.includes(lowerWord);
    });
  }

  addWord(word: string): void {
    if (!this.blocklist.includes(word.toLowerCase())) {
      this.blocklist.push(word.toLowerCase());
    }
  }

  removeWord(word: string): void {
    const lowerWord = word.toLowerCase();
    this.blocklist = this.blocklist.filter((w) => w !== lowerWord);
  }

  getBlocklist(): string[] {
    return [...this.blocklist];
  }
}
