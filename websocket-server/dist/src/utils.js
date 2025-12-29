"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenUserId = shortenUserId;
exports.hashIP = hashIP;
exports.getClientIP = getClientIP;
exports.isValidMessage = isValidMessage;
const crypto_1 = __importDefault(require("crypto"));
function shortenUserId(userId) {
    return `anon-${userId.substring(0, 6)}`;
}
function hashIP(ip) {
    return crypto_1.default.createHash("sha256").update(ip).digest("hex");
}
function getClientIP(req) {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") {
        return forwarded.split(",")[0].trim();
    }
    return req.socket?.remoteAddress || "unknown";
}
function isValidMessage(message) {
    if (!message || message.trim().length === 0) {
        return { valid: false, error: "Message cannot be empty" };
    }
    if (message.length > 500) {
        return { valid: false, error: "Message too long (max 500 characters)" };
    }
    return { valid: true };
}
//# sourceMappingURL=utils.js.map