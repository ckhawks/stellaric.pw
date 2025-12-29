import crypto from "crypto";

export function shortenUserId(userId: string): string {
  return `anon-${userId.substring(0, 6)}`;
}

export function hashIP(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

export function getClientIP(req: any): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

export function isValidMessage(message: string): {
  valid: boolean;
  error?: string;
} {
  if (!message || message.trim().length === 0) {
    return { valid: false, error: "Message cannot be empty" };
  }

  if (message.length > 500) {
    return { valid: false, error: "Message too long (max 500 characters)" };
  }

  return { valid: true };
}
