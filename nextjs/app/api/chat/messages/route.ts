import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET recent messages (fallback for when WebSocket is not available)
export async function GET() {
  try {
    const result = await query(
      `SELECT id, anonymous_user_id, pseudonym, message, timestamp
       FROM chat_messages
       ORDER BY timestamp DESC
       LIMIT 100`
    );

    const messages = result.rows
      .reverse()
      .map((msg) => ({
        id: msg.id,
        anonymous_user_id: msg.anonymous_user_id,
        pseudonym: msg.pseudonym || `anon-${msg.anonymous_user_id.substring(0, 6)}`,
        message: msg.message,
        timestamp: msg.timestamp.toISOString(),
      }));

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
