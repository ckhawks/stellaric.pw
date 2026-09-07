const PUSHOVER_URL = "https://api.pushover.net/1/messages.json";

// Pushover truncates past 1024 characters.
const PUSHOVER_MESSAGE_MAX = 1024;

interface PushoverOptions {
  title: string;
  message: string;
  url?: string;
  urlTitle?: string;
}

// Fire-and-forget. A failed notification must never fail the request that
// triggered it - the light already changed by the time this runs.
export async function sendPushover(options: PushoverOptions): Promise<void> {
  const token = process.env.PUSHOVER_TOKEN;
  const user = process.env.PUSHOVER_USER;

  if (!token || !user) {
    return;
  }

  try {
    const body = new URLSearchParams({
      token,
      user,
      title: options.title,
      message: options.message.slice(0, PUSHOVER_MESSAGE_MAX),
      priority: process.env.PUSHOVER_PRIORITY || "0",
    });

    if (options.url) {
      body.set("url", options.url);
    }
    if (options.urlTitle) {
      body.set("url_title", options.urlTitle);
    }

    const response = await fetch(PUSHOVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Pushover rejected the message:", text.slice(0, 200));
    }
  } catch (error) {
    console.error("Pushover notification failed:", error);
  }
}
