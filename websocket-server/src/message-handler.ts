import { saveMessage, getRecentMessages, getPseudonymForIP, savePseudonymForIP } from "./database";
import { RateLimiter } from "./rate-limiter";
import { WordFilter } from "./word-filter";
import { RedisClient } from "./redis";
import { ChatMessage } from "./types";
import { isValidMessage } from "./utils";
import { generatePseudonym } from "./pseudonym-generator";

export class MessageHandler {
  private rateLimiter: RateLimiter;
  private wordFilter: WordFilter;
  private redisClient: RedisClient;

  constructor(redisClient: RedisClient) {
    this.rateLimiter = new RateLimiter();
    this.wordFilter = new WordFilter();
    this.redisClient = redisClient;
  }

  async handleIncomingMessage(
    userId: string,
    message: string,
    ipHash?: string
  ): Promise<{
    success: boolean;
    data?: ChatMessage;
    error?: string;
  }> {
    try {
      // Validate message format
      const validation = isValidMessage(message);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Check rate limit
      if (!this.rateLimiter.canSendMessage(userId, ipHash)) {
        const ipHashShort = ipHash?.substring(0, 8) || "unknown";
        console.warn(`Rate limit exceeded for ${ipHashShort}...`);
        return {
          success: false,
          error: "Rate limit exceeded. Please wait before sending another message.",
        };
      }

      // Check blocklist
      if (this.wordFilter.containsBlockedWord(message)) {
        const ipHashShort = ipHash?.substring(0, 8) || "unknown";
        console.warn(`Blocked word detected from ${ipHashShort}...: "${message.substring(0, 50)}..."`);
        return {
          success: false,
          error: "Message contains blocked words",
        };
      }

      // Get or generate pseudonym for this IP
      let pseudonym: string;
      if (ipHash) {
        const existingPseudonym = await getPseudonymForIP(ipHash);
        if (existingPseudonym) {
          pseudonym = existingPseudonym;
        } else {
          pseudonym = generatePseudonym();
          await savePseudonymForIP(ipHash, pseudonym);
        }
      } else {
        pseudonym = generatePseudonym();
      }

      // Save to database
      const savedMessage = await saveMessage(
        userId,
        message.trim(),
        pseudonym,
        ipHash
      );

      // Broadcast via Redis
      await this.redisClient.publishMessage({
        id: savedMessage.id,
        anonymous_user_id: savedMessage.anonymous_user_id,
        pseudonym: savedMessage.pseudonym,
        message: savedMessage.message,
        timestamp: savedMessage.timestamp.toISOString(),
      });

      const ipHashShort = ipHash?.substring(0, 8) || "unknown";
      console.log(`Message saved: ID ${savedMessage.id} from ${pseudonym} (${ipHashShort}...)`);

      return {
        success: true,
        data: savedMessage,
      };
    } catch (error) {
      console.error("Error handling incoming message:", error);
      return {
        success: false,
        error: "An error occurred while processing your message",
      };
    }
  }

  async getInitialMessages(limit: number = 100): Promise<ChatMessage[]> {
    try {
      return await getRecentMessages(limit);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
      return [];
    }
  }

  destroy(): void {
    this.rateLimiter.destroy();
  }

  getConnectionLimiter(): RateLimiter {
    return this.rateLimiter;
  }
}
