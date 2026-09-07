import { NextRequest, NextResponse } from "next/server";
import {
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
  getClientIP,
  getSecondsUntilAllowed,
  hashIP,
  recordLightChange,
  sanitizeText,
} from "@/lib/db/light-changes";
import { sendPushover } from "@/lib/pushover";

function getEnvVars() {
  const INTERNAL_API_URL = process.env.INTERNAL_API_URL;
  const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

  if (!INTERNAL_API_URL || !INTERNAL_API_KEY) {
    throw new Error(
      "INTERNAL_API_URL and INTERNAL_API_KEY environment variables must be set"
    );
  }

  return { INTERNAL_API_URL, INTERNAL_API_KEY };
}

// GET current light info
export async function GET() {
  try {
    const { INTERNAL_API_URL, INTERNAL_API_KEY } = getEnvVars();

    const response = await fetch(`${INTERNAL_API_URL}/hue/light`, {
      method: "GET",
      headers: {
        "x-api-key": INTERNAL_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch light info" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching light info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST to change light color. Requires a name so there is a record of who did
// it; the message is optional.
export async function POST(request: NextRequest) {
  try {
    const { INTERNAL_API_URL, INTERNAL_API_KEY } = getEnvVars();
    const body = await request.json();
    const { color, brightness } = body;

    if (!color || typeof color !== "string") {
      return NextResponse.json({ error: "Color is required" }, { status: 400 });
    }

    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
      return NextResponse.json(
        { error: "Color must be a hex value like #FF0000" },
        { status: 400 }
      );
    }

    const name = sanitizeText(
      typeof body.name === "string" ? body.name : "",
      NAME_MAX_LENGTH
    );
    if (!name) {
      return NextResponse.json(
        { error: "Please leave a name" },
        { status: 400 }
      );
    }

    const message =
      sanitizeText(
        typeof body.message === "string" ? body.message : "",
        MESSAGE_MAX_LENGTH
      ) || null;

    const ipHash = hashIP(getClientIP(request));

    const waitSeconds = await getSecondsUntilAllowed(ipHash);
    if (waitSeconds > 0) {
      return NextResponse.json(
        {
          error: `Slow down - try again in ${waitSeconds}s`,
          retryAfter: waitSeconds,
        },
        { status: 429, headers: { "Retry-After": String(waitSeconds) } }
      );
    }

    const payload: Record<string, unknown> = { color };
    if (brightness !== undefined) {
      payload.brightness = brightness;
    }

    const response = await fetch(`${INTERNAL_API_URL}/hue/light`, {
      method: "POST",
      headers: {
        "x-api-key": INTERNAL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to update light" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // The light already changed. Logging and notifying are best-effort from
    // here on - neither should turn a successful change into an error.
    try {
      await recordLightChange({
        name,
        message,
        color: color.toUpperCase(),
        brightness: typeof brightness === "number" ? brightness : null,
        ipHash,
        userAgent: request.headers.get("user-agent"),
      });
    } catch (error) {
      console.error("Failed to record light change:", error);
    }

    const lines = [`${name} set the light to ${color.toUpperCase()}`];
    if (message) {
      lines.push("", message);
    }

    await sendPushover({
      title: "Light changed",
      message: lines.join("\n"),
      url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://stellaric.pw"}/light`,
      urlTitle: "Open light control",
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating light:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
