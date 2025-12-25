import { NextRequest, NextResponse } from "next/server";

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

// POST to change light color
export async function POST(request: NextRequest) {
  try {
    const { INTERNAL_API_URL, INTERNAL_API_KEY } = getEnvVars();
    const body = await request.json();
    const { color, brightness } = body;

    if (!color) {
      return NextResponse.json(
        { error: "Color is required" },
        { status: 400 }
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
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating light:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
