export class RateLimiter {
  private userTimestamps: Map<string, number> = new Map();
  private ipTimestamps: Map<string, number> = new Map();
  private ipConnections: Map<string, number> = new Map();
  private readonly RATE_LIMIT_MS = 1000; // 1 second per user
  private readonly MAX_CONNECTIONS_PER_IP = 5;
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up old entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  canSendMessage(userId: string, ipHash?: string): boolean {
    const now = Date.now();

    // Check user-based rate limit
    const lastUserMessageTime = this.userTimestamps.get(userId);
    if (
      lastUserMessageTime &&
      now - lastUserMessageTime < this.RATE_LIMIT_MS
    ) {
      return false;
    }

    // Optionally check IP-based rate limit for additional protection
    if (ipHash) {
      const lastIpMessageTime = this.ipTimestamps.get(ipHash);
      if (
        lastIpMessageTime &&
        now - lastIpMessageTime < this.RATE_LIMIT_MS
      ) {
        return false;
      }
      this.ipTimestamps.set(ipHash, now);
    }

    this.userTimestamps.set(userId, now);
    return true;
  }

  private cleanup(): void {
    const now = Date.now();
    const expirationTime = 60 * 1000; // 1 minute

    // Clean user timestamps
    for (const [userId, timestamp] of this.userTimestamps.entries()) {
      if (now - timestamp > expirationTime) {
        this.userTimestamps.delete(userId);
      }
    }

    // Clean IP timestamps
    for (const [ipHash, timestamp] of this.ipTimestamps.entries()) {
      if (now - timestamp > expirationTime) {
        this.ipTimestamps.delete(ipHash);
      }
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }

  reset(): void {
    this.userTimestamps.clear();
    this.ipTimestamps.clear();
    this.ipConnections.clear();
  }

  canConnect(ipHash: string): boolean {
    const connections = this.ipConnections.get(ipHash) || 0;
    if (connections >= this.MAX_CONNECTIONS_PER_IP) {
      return false;
    }
    this.ipConnections.set(ipHash, connections + 1);
    return true;
  }

  recordDisconnect(ipHash: string): void {
    const connections = this.ipConnections.get(ipHash) || 0;
    if (connections > 0) {
      this.ipConnections.set(ipHash, connections - 1);
    }
  }
}
