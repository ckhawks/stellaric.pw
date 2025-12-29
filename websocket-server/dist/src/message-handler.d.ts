import { RateLimiter } from "./rate-limiter";
import { RedisClient } from "./redis";
import { ChatMessage } from "./types";
export declare class MessageHandler {
    private rateLimiter;
    private wordFilter;
    private redisClient;
    constructor(redisClient: RedisClient);
    handleIncomingMessage(userId: string, message: string, ipHash?: string): Promise<{
        success: boolean;
        data?: ChatMessage;
        error?: string;
    }>;
    getInitialMessages(limit?: number): Promise<ChatMessage[]>;
    destroy(): void;
    getConnectionLimiter(): RateLimiter;
}
//# sourceMappingURL=message-handler.d.ts.map