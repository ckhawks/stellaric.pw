export declare class RedisClient {
    private publisher;
    private subscriber;
    private readonly KEY_PREFIX;
    private readonly CHANNEL;
    constructor();
    publishMessage(message: any): Promise<void>;
    subscribeToMessages(callback: (message: any) => void, errorCallback?: (error: Error) => void): void;
    close(): Promise<void>;
}
//# sourceMappingURL=redis.d.ts.map