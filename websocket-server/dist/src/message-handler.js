"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHandler = void 0;
const database_1 = require("./database");
const rate_limiter_1 = require("./rate-limiter");
const word_filter_1 = require("./word-filter");
const utils_1 = require("./utils");
const pseudonym_generator_1 = require("./pseudonym-generator");
class MessageHandler {
    constructor(redisClient) {
        this.rateLimiter = new rate_limiter_1.RateLimiter();
        this.wordFilter = new word_filter_1.WordFilter();
        this.redisClient = redisClient;
    }
    async handleIncomingMessage(userId, message, ipHash) {
        try {
            // Validate message format
            const validation = (0, utils_1.isValidMessage)(message);
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
            let pseudonym;
            if (ipHash) {
                const existingPseudonym = await (0, database_1.getPseudonymForIP)(ipHash);
                if (existingPseudonym) {
                    pseudonym = existingPseudonym;
                }
                else {
                    pseudonym = (0, pseudonym_generator_1.generatePseudonym)();
                    await (0, database_1.savePseudonymForIP)(ipHash, pseudonym);
                }
            }
            else {
                pseudonym = (0, pseudonym_generator_1.generatePseudonym)();
            }
            // Save to database
            const savedMessage = await (0, database_1.saveMessage)(userId, message.trim(), pseudonym, ipHash);
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
        }
        catch (error) {
            console.error("Error handling incoming message:", error);
            return {
                success: false,
                error: "An error occurred while processing your message",
            };
        }
    }
    async getInitialMessages(limit = 100) {
        try {
            return await (0, database_1.getRecentMessages)(limit);
        }
        catch (error) {
            console.error("Error fetching initial messages:", error);
            return [];
        }
    }
    destroy() {
        this.rateLimiter.destroy();
    }
    getConnectionLimiter() {
        return this.rateLimiter;
    }
}
exports.MessageHandler = MessageHandler;
//# sourceMappingURL=message-handler.js.map