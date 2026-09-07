import crypto from "crypto";
import { query } from "./index";
import { LightChange } from "./types";

export const NAME_MAX_LENGTH = 40;
export const MESSAGE_MAX_LENGTH = 280;

// One submission per IP per this window. The color picker is a toy, not a
// firehose - without this a script could drive both the bulb and the phone.
const RATE_LIMIT_SECONDS = 15;

export function hashIP(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

// Strip control characters and collapse whitespace so a submission cannot
// forge line breaks in the Pushover notification.
export function sanitizeText(input: string, maxLength: number): string {
  return input
    .replace(/[\x00-\x1F\x7F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export async function getSecondsUntilAllowed(ipHash: string): Promise<number> {
  const result = await query(
    `SELECT created_at FROM light_changes
     WHERE ip_hash = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [ipHash]
  );

  if (!result.rows[0]) {
    return 0;
  }

  const elapsed =
    (Date.now() - new Date(result.rows[0].created_at).getTime()) / 1000;
  return Math.max(0, Math.ceil(RATE_LIMIT_SECONDS - elapsed));
}

export async function recordLightChange(entry: {
  name: string;
  message: string | null;
  color: string;
  brightness: number | null;
  ipHash: string | null;
  userAgent: string | null;
}): Promise<LightChange> {
  const result = await query(
    `INSERT INTO light_changes (name, message, color, brightness, ip_hash, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, message, color, brightness, ip_hash, user_agent, created_at`,
    [
      entry.name,
      entry.message,
      entry.color,
      entry.brightness,
      entry.ipHash,
      entry.userAgent,
    ]
  );

  return result.rows[0] as LightChange;
}

export async function getRecentLightChanges(
  limit: number = 50
): Promise<LightChange[]> {
  const result = await query(
    `SELECT id, name, message, color, brightness, created_at
     FROM light_changes
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit]
  );

  return result.rows as LightChange[];
}
