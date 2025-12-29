"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
class RateLimiter {
    constructor() {
        this.userTimestamps = new Map();
        this.ipTimestamps = new Map();
        this.ipConnections = new Map();
        this.RATE_LIMIT_MS = 1000; // 1 second per user
        this.MAX_CONNECTIONS_PER_IP = 5;
        // Clean up old entries every 5 minutes
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, 5 * 60 * 1000);
    }
    canSendMessage(userId, ipHash) {
        const now = Date.now();
        // Check user-based rate limit
        const lastUserMessageTime = this.userTimestamps.get(userId);
        if (lastUserMessageTime &&
            now - lastUserMessageTime < this.RATE_LIMIT_MS) {
            return false;
        }
        // Optionally check IP-based rate limit for additional protection
        if (ipHash) {
            const lastIpMessageTime = this.ipTimestamps.get(ipHash);
            if (lastIpMessageTime &&
                now - lastIpMessageTime < this.RATE_LIMIT_MS) {
                return false;
            }
            this.ipTimestamps.set(ipHash, now);
        }
        this.userTimestamps.set(userId, now);
        return true;
    }
    cleanup() {
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
    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
    reset() {
        this.userTimestamps.clear();
        this.ipTimestamps.clear();
        this.ipConnections.clear();
    }
    canConnect(ipHash) {
        const connections = this.ipConnections.get(ipHash) || 0;
        if (connections >= this.MAX_CONNECTIONS_PER_IP) {
            return false;
        }
        this.ipConnections.set(ipHash, connections + 1);
        return true;
    }
    recordDisconnect(ipHash) {
        const connections = this.ipConnections.get(ipHash) || 0;
        if (connections > 0) {
            this.ipConnections.set(ipHash, connections - 1);
        }
    }
}
exports.RateLimiter = RateLimiter;
//# sourceMappingURL=rate-limiter.js.map