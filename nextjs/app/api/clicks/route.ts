import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET current click count
export async function GET() {
  try {
    // Initialize click counter if it doesn't exist
    await query(
      `INSERT INTO click_counter (id, total_clicks) VALUES (1, 0)
       ON CONFLICT (id) DO NOTHING`
    );

    const result = await query(
      `SELECT total_clicks FROM click_counter WHERE id = 1`
    );

    const clickCount = result.rows[0]?.total_clicks || 0;

    return NextResponse.json({ total_clicks: clickCount.toString() });
  } catch (error) {
    console.error("Error fetching click count:", error);
    return NextResponse.json(
      { error: "Failed to fetch click count" },
      { status: 500 }
    );
  }
}
