import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

// API authentication
const API_KEY = process.env.API_KEY;

// Hue Bridge configuration from environment variables
const HUE_BRIDGE_IP = process.env.HUE_BRIDGE_IP;
const HUE_USERNAME = process.env.HUE_USERNAME;
const DEFAULT_LIGHT_ID = parseInt(process.env.DEFAULT_LIGHT_ID || "2", 10);

if (!API_KEY) {
  console.error("Missing required environment variable: API_KEY");
  process.exit(1);
}

if (!HUE_BRIDGE_IP || !HUE_USERNAME) {
  console.error(
    "Missing required environment variables: HUE_BRIDGE_IP and HUE_USERNAME"
  );
  process.exit(1);
}

// Auth middleware
function requireApiKey(req: Request, res: Response, next: NextFunction): void {
  const providedKey = req.headers["x-api-key"];

  if (!providedKey || providedKey !== API_KEY) {
    res.status(401).json({ error: "Unauthorized: Invalid or missing API key" });
    return;
  }

  next();
}

// Type definitions
interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSB {
  hue: number;
  sat: number;
  bri: number;
}

interface LightState {
  on: boolean;
  hue: number;
  sat: number;
  bri: number;
}

interface HueControlRequest {
  color: string;
  brightness?: number;
}

// Helper function to convert hex color to RGB
function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Helper function to convert RGB to HSB (Hue, Saturation, Brightness)
function rgbToHsb(r: number, g: number, b: number): HSB {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Calculate hue
  let hue = 0;
  if (delta !== 0) {
    if (max === r) {
      hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      hue = ((b - r) / delta + 2) / 6;
    } else {
      hue = ((r - g) / delta + 4) / 6;
    }
  }

  // Calculate saturation
  const sat = max === 0 ? 0 : delta / max;

  // Calculate brightness
  const bri = max;

  // Convert to Hue API values
  // Hue: 0-65535, Saturation: 0-254, Brightness: 0-254
  return {
    hue: Math.round(hue * 65535),
    sat: Math.round(sat * 254),
    bri: Math.round(bri * 254),
  };
}

// Helper function to parse color from various formats
function parseColor(colorInput: string): HSB | null {
  if (!colorInput) return null;

  // Handle hex color
  if (colorInput.startsWith("#")) {
    const rgb = hexToRgb(colorInput);
    return rgb ? rgbToHsb(rgb.r, rgb.g, rgb.b) : null;
  }

  // Handle rgb(r, g, b) format
  const rgbMatch = colorInput.match(
    /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
  );
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch.map(Number);
    return rgbToHsb(r, g, b);
  }

  return null;
}

// Helper function to convert HSB back to HEX
function hsbToHex(hue: number, sat: number, bri: number): string {
  // Normalize HSB values from Hue API range to 0-1
  const h = hue / 65535;
  const s = sat / 254;
  const b = bri / 254;

  // Convert HSB to RGB
  const c = b * s;
  const hh = h * 6;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  let r: number, g: number, bl: number;

  if (hh < 1) {
    [r, g, bl] = [c, x, 0];
  } else if (hh < 2) {
    [r, g, bl] = [x, c, 0];
  } else if (hh < 3) {
    [r, g, bl] = [0, c, x];
  } else if (hh < 4) {
    [r, g, bl] = [0, x, c];
  } else if (hh < 5) {
    [r, g, bl] = [x, 0, c];
  } else {
    [r, g, bl] = [c, 0, x];
  }

  const m = b - c;
  const [r8, g8, b8] = [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((bl + m) * 255),
  ];

  return `#${r8.toString(16).padStart(2, "0")}${g8
    .toString(16)
    .padStart(2, "0")}${b8.toString(16).padStart(2, "0")}`.toUpperCase();
}

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// POST endpoint to control Hue bulb color
// Expected body:
// {
//   "color": "#FF0000"  or  "rgb(255, 0, 0)",
//   "brightness": 254   // optional (0-254)
// }
app.post(
  "/hue/light",
  requireApiKey,
  async (
    req: Request<{}, {}, HueControlRequest>,
    res: Response
  ): Promise<void> => {
    try {
      const { color, brightness } = req.body;

      if (!color) {
        res.status(400).json({
          error: "color is required (hex like #FF0000 or rgb(255,0,0))",
        });
        return;
      }

      // Parse the color
      const hsb = parseColor(color);
      if (!hsb) {
        res
          .status(400)
          .json({ error: "Invalid color format. Use #RRGGBB or rgb(r,g,b)" });
        return;
      }

      // Build the state object
      const state: LightState = {
        on: true,
        hue: hsb.hue,
        sat: hsb.sat,
        bri: brightness !== undefined ? brightness : hsb.bri,
      };

      // Send request to Hue Bridge
      const url = `http://${HUE_BRIDGE_IP}/api/${HUE_USERNAME}/lights/${DEFAULT_LIGHT_ID}/state`;
      const response = await axios.put(url, state);

      res.json({
        success: true,
        color,
        brightness: state.bri,
        result: response.data,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error controlling Hue light:", errorMessage);
      res.status(500).json({
        error: "Failed to control light",
        details: errorMessage,
      });
    }
  }
);

// GET endpoint to get bulb 2 status
app.get("/hue/light", requireApiKey, async (req: Request, res: Response): Promise<void> => {
  try {
    const url = `http://${HUE_BRIDGE_IP}/api/${HUE_USERNAME}/lights/${DEFAULT_LIGHT_ID}`;
    const response = await axios.get(url);
    const lightData = response.data;

    const color = hsbToHex(
      lightData.state.hue,
      lightData.state.sat,
      lightData.state.bri
    );

    res.json({
      color,
      brightness: lightData.state.bri,
      on: lightData.state.on,
      name: lightData.name,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching light status:", errorMessage);
    res.status(500).json({
      error: "Failed to fetch light status",
      details: errorMessage,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Hue API server running on http://localhost:${PORT}`);
  console.log(`POST /hue/light - Control bulb 2 color`);
  console.log(`GET /hue/light - Get bulb 2 status`);
});
