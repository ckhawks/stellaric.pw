import Redis from "ioredis";

export class RedisClient {
  private publisher: Redis;
  private subscriber: Redis;
  private readonly KEY_PREFIX = "stellaricpw_chat:";
  private readonly CHANNEL = "stellaricpw_chat:messages";

  constructor() {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

    // Use database 2 to avoid conflicts with other projects
    this.publisher = new Redis(redisUrl, { db: 2 });
    this.subscriber = new Redis(redisUrl, { db: 2 });

    this.publisher.on("error", (err) => {
      console.error("Redis publisher error:", err);
    });

    this.subscriber.on("error", (err) => {
      console.error("Redis subscriber error:", err);
    });
  }

  async publishMessage(message: any): Promise<void> {
    try {
      await this.publisher.publish(this.CHANNEL, JSON.stringify(message));
    } catch (error) {
      console.error("Error publishing message to Redis:", error);
    }
  }

  subscribeToMessages(
    callback: (message: any) => void,
    errorCallback?: (error: Error) => void
  ): void {
    this.subscriber.subscribe(this.CHANNEL, (err) => {
      if (err) {
        console.error("Error subscribing to Redis channel:", err);
        if (errorCallback) errorCallback(err);
      }
    });

    this.subscriber.on("message", (channel, data) => {
      try {
        const message = JSON.parse(data);
        callback(message);
      } catch (error) {
        console.error("Error parsing Redis message:", error);
      }
    });
  }

  async close(): Promise<void> {
    await this.publisher.quit();
    await this.subscriber.quit();
  }
}
