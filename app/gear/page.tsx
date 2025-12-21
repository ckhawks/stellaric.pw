import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import {
  Monitor,
  Cpu,
  HardDrive,
  Camera,
  Gamepad2,
  Music,
  Lightbulb,
} from "lucide-react";

const gearCategories = [
  {
    category: "Development",
    icon: Monitor,
    items: [
      { name: "MacBook Pro M3", type: "Laptop", details: "32GB RAM, 1TB SSD" },
      {
        name: 'LG UltraWide 34"',
        type: "Monitor",
        details: "3440x1440, 144Hz",
      },
      {
        name: "Keychron Q1 Pro",
        type: "Keyboard",
        details: "Mechanical, Gateron Pro Browns",
      },
      {
        name: "Logitech MX Master 3S",
        type: "Mouse",
        details: "Wireless, 8000 DPI",
      },
    ],
  },
  {
    category: "Server & Infrastructure",
    icon: Cpu,
    items: [
      {
        name: "Homelab Server",
        type: "Server",
        details: "32-core, 128GB RAM, Proxmox",
      },
      { name: "Synology DS920+", type: "NAS", details: "8TB x 4, RAID 6" },
      {
        name: "UniFi Dream Machine Pro",
        type: "Network",
        details: "10Gb SFP+",
      },
    ],
  },
  {
    category: "Photography",
    icon: Camera,
    items: [
      { name: "Sony A7 IV", type: "Camera", details: "33MP, Full Frame" },
      {
        name: "Sony 24-70mm f/2.8 GM II",
        type: "Lens",
        details: "Standard Zoom",
      },
      { name: "Sony 85mm f/1.8", type: "Lens", details: "Portrait Prime" },
      { name: "Peak Design Everyday Backpack", type: "Bag", details: "30L" },
    ],
  },
  {
    category: "Audio & Music Production",
    icon: Music,
    items: [
      {
        name: "Pioneer DDJ-1000",
        type: "DJ Controller",
        details: "4-channel, Rekordbox",
      },
      {
        name: "Audio-Technica M50x",
        type: "Headphones",
        details: "Studio Monitoring",
      },
      {
        name: "Focusrite Scarlett 2i2",
        type: "Audio Interface",
        details: "USB-C, 24-bit/192kHz",
      },
      { name: "Ableton Live 11 Suite", type: "Software", details: "DAW" },
    ],
  },
  {
    category: "Video Production",
    icon: Gamepad2,
    items: [
      {
        name: "Blackmagic ATEM Mini Pro",
        type: "Switcher",
        details: "4-input HDMI",
      },
      {
        name: "vMix 4K",
        type: "Software",
        details: "Live production software",
      },
      {
        name: "Elgato Stream Deck",
        type: "Controller",
        details: "15 LCD keys",
      },
      {
        name: "OBS Studio",
        type: "Software",
        details: "Streaming & recording",
      },
    ],
  },
  {
    category: "Lighting & Stage",
    icon: Lightbulb,
    items: [
      {
        name: "Wolfmix WMX1",
        type: "DMX Controller",
        details: "Lighting control",
      },
      {
        name: "TouchDesigner",
        type: "Software",
        details: "Visual programming",
      },
      {
        name: "CHAUVET DJ Intimidator",
        type: "Moving Head",
        details: "LED, DMX512",
      },
    ],
  },
  {
    category: "Gaming",
    icon: Gamepad2,
    items: [
      {
        name: "Custom PC",
        type: "Desktop",
        details: "RTX 4080, 32GB RAM, 2TB NVMe",
      },
      {
        name: "Xbox Elite Controller",
        type: "Controller",
        details: "Series 2",
      },
      {
        name: "SteelSeries Arctis Pro",
        type: "Headset",
        details: "Wireless, Hi-Res",
      },
    ],
  },
  {
    category: "Software Stack",
    icon: HardDrive,
    items: [
      { name: "VSCode", type: "Editor", details: "Primary IDE" },
      { name: "Godot Engine", type: "Game Dev", details: "v4.x" },
      { name: "Blender", type: "3D Modeling", details: "Low poly workflow" },
      {
        name: "DaVinci Resolve",
        type: "Video Editing",
        details: "Color grading & editing",
      },
    ],
  },
];

export default function GearPage() {
  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6 mb-12">
            <h1 className="font-mono text-4xl font-bold text-foreground">
              Gear Rack
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Hardware and software I use for development, content creation, and
              production work.
            </p>
          </div>

          <div className="space-y-8">
            {gearCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.category}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-5 h-5 text-accent" />
                    <h2 className="font-mono text-xl font-semibold text-foreground">
                      {category.category}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.items.map((item) => (
                      <Card
                        key={item.name}
                        className="p-4 border-border bg-card hover:border-accent/50 transition-colors"
                      >
                        <div className="font-mono text-sm font-medium text-foreground mb-1">
                          {item.name}
                        </div>
                        <div className="font-mono text-xs text-accent mb-2">
                          {item.type}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.details}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
