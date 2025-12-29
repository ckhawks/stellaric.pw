"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisClient {
    constructor() {
        this.KEY_PREFIX = "stellaricpw_chat:";
        this.CHANNEL = "stellaricpw_chat:messages";
        const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
        // Use database 2 to avoid conflicts with other projects
        this.publisher = new ioredis_1.default(redisUrl, { db: 2 });
        this.subscriber = new ioredis_1.default(redisUrl, { db: 2 });
        this.publisher.on("error", (err) => {
            console.error("Redis publisher error:", err);
        });
        this.subscriber.on("error", (err) => {
            console.error("Redis subscriber error:", err);
        });
    }
    async publishMessage(message) {
        try {
            await this.publisher.publish(this.CHANNEL, JSON.stringify(message));
        }
        catch (error) {
            console.error("Error publishing message to Redis:", error);
        }
    }
    subscribeToMessages(callback, errorCallback) {
        this.subscriber.subscribe(this.CHANNEL, (err) => {
            if (err) {
                console.error("Error subscribing to Redis channel:", err);
                if (errorCallback)
                    errorCallback(err);
            }
        });
        this.subscriber.on("message", (channel, data) => {
            try {
                const message = JSON.parse(data);
                callback(message);
            }
            catch (error) {
                console.error("Error parsing Redis message:", error);
            }
        });
    }
    async close() {
        await this.publisher.quit();
        await this.subscriber.quit();
    }
}
exports.RedisClient = RedisClient;
//# sourceMappingURL=redis.js.map