export declare class RateLimiter {
    private userTimestamps;
    private ipTimestamps;
    private ipConnections;
    private readonly RATE_LIMIT_MS;
    private readonly MAX_CONNECTIONS_PER_IP;
    private cleanupInterval;
    constructor();
    canSendMessage(userId: string, ipHash?: string): boolean;
    private cleanup;
    destroy(): void;
    reset(): void;
    canConnect(ipHash: string): boolean;
    recordDisconnect(ipHash: string): void;
}
//# sourceMappingURL=rate-limiter.d.ts.map