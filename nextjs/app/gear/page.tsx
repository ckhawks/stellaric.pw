import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { getS3Url } from "@/lib/broadcasts";
import {
  Monitor,
  Cpu,
  HardDrive,
  Camera,
  Gamepad2,
  Music,
  Lightbulb,
} from "lucide-react";

const gearSections = [
  {
    section: "Home Desk",
    icon: Monitor,
    layout: "grid",
    description: "Workspace setup for gaming, development, and broadcasting",
    items: [
      {
        name: "MacBook Pro M1 Max",
        type: "Laptop",
        details: "Personal development, DJing, and photo editing",
        image: "gear-pics/macbook.jpg",
      },
      {
        name: "MacBook Pro M4 Max",
        type: "Laptop",
        details: "Work-work",
        image: "gear-pics/macbook.jpg",
      },
      {
        name: "Logitech G502 SE",
        type: "Mouse",
        details: "Gaming mouse",
        image: "gear-pics/g502.jpg",
      },
      {
        name: "Custom Tofu65",
        type: "Keyboard",
        details: "Mechanical keyboard",
      },
      {
        name: "Stream Deck XL",
        type: "Controller",
        details: "Broadcast and macro control",
        image: "gear-pics/streamdeck xl.jpg",
      },
      {
        name: "White PS5 Controller",
        type: "Controller",
        details: "For Rocket League and PlateUp!",
        image: "gear-pics/ps5.jpg",
      },
      {
        name: "Komplete Audio 2",
        type: "Audio Interface",
        details: "For microphones and audio",
        image: "gear-pics/kompleteaudio2.webp",
      },
      {
        name: "Beyerdynamic DT 990 Pro",
        type: "Headphones",
        details: "Desk headphones",
        image: "gear-pics/990pro.jpg",
      },
      {
        name: "HP X34 Ultrawide",
        type: "Monitor",
        details: "34-inch 3440x1440 ultrawide IPS monitor",
        image: "gear-pics/hp-x34.jpg",
      },
      {
        name: "AG Neovo EM3401UQC",
        type: "Monitor",
        details: "34-inch 3440x1440 ultrawide IPS monitor",
        image: "gear-pics/neovo-em3401uqc.jpg",
      },
      {
        name: "Pixel 6 Pro",
        type: "Phone",
        details: "6.7-inch QHD+ OLED display",
        image: "gear-pics/pixel-6-pro.jpg",
      },
      {
        name: "Herman Miller Embody",
        type: "Chair",
        details: "No complaints!",
        image: "gear-pics/herman-miller.avif",
      },
    ],
  },
  {
    section: "Desktop PC",
    icon: Cpu,
    layout: "specs",
    description: "Custom gaming & development rig",
    specs: [
      {
        label: "CPU",
        value: "AMD Ryzen 9 7950X3D",
        detail: "16-core, 4.2 GHz",
      },
      { label: "GPU", value: "RTX 4080 SUPER", detail: "16GB VRAM" },
      {
        label: "RAM",
        value: "Corsair Vengeance RGB",
        detail: "64GB DDR5-6000",
      },
      { label: "Storage", value: "Samsung 990 Pro", detail: "4TB NVMe SSD" },
      { label: "Cooling", value: "NZXT Kraken X73", detail: "Liquid cooling" },
      { label: "PSU", value: "Corsair RM850x", detail: "850W Gold" },
    ],
  },
  {
    section: "Server & Storage",
    icon: Cpu,
    layout: "specs",
    description: "UnRAID NAS setup",
    specs: [
      { label: "OS", value: "UnRAID", detail: "15-bay Rosewill 4U Rackmount" },
      {
        label: "CPU",
        value: "Dual Intel Xeon E5-2630L",
        detail: "2x 6-core, 2.0 GHz",
      },
      { label: "RAM", value: "64GB DDR3 ECC", detail: "Server RAM" },
      {
        label: "Storage",
        value: "WD Elements 8TB x4",
        detail: "External drives",
      },
    ],
  },
  {
    section: "DJ & Audio",
    icon: Music,
    layout: "grid",
    description: "Complete DJ setup with audio equipment",
    items: [
      {
        name: "DDJ-FLX4",
        type: "DJ Controller",
        details: "Rekordbox compatible",
        image: "gear-pics/ddj-flx4.png",
      },
      {
        name: "Rekordbox",
        type: "Software",
        details: "DJ software",
        image: "gear-pics/rekordbox.webp",
      },
      {
        name: "Mackie Thump 212XT",
        type: "Speaker",
        details: "Loudspeaker, x2",
        image: "gear-pics/mackie-212xt.webp",
      },
      {
        name: "Mackie Thump 218S",
        type: "Subwoofer",
        details: "Subwoofer",
        image: "gear-pics/thump-218s.jpg",
      },
      {
        name: "Mackie Thump Mix8",
        type: "Mixer",
        details: "8-channel compact mixer",
        image: "gear-pics/mackie-mix8.jpg",
      },
      {
        name: "ATH-M50x",
        type: "Headphones",
        details: "For DJing & work",
        image: "gear-pics/ath-m50x.webp",
      },
      {
        name: "Wolfmix WMX1 MK2",
        type: "DJ Lighting",
        details: "Lighting control",
        image: "gear-pics/wolfmix wmx1 mk2.jpg",
      },
      {
        name: "AKAI MPC Mini MK3",
        type: "MIDI Controller",
        details: "Music production & lighting control",
        image: "gear-pics/apc-mini.png",
      },
    ],
  },
  {
    section: "Broadcast & Production",
    icon: Gamepad2,
    layout: "grid",
    description: "Live streaming and content creation",
    items: [
      {
        name: "vMix",
        type: "Software",
        details: "Live broadcast software",
        image: "gear-pics/vmix.png",
      },
      {
        name: "OBS",
        type: "Software",
        details: "Broadcasting & recording",
        image: "gear-pics/OBS_Studio_Logo.svg.png",
      },
      {
        name: "Elgato Cam Link 4K",
        type: "Capture Card",
        details: "For camera input",
        image: "gear-pics/elgato-cam-link.jpg",
      },
    ],
  },
  {
    section: "Photography",
    icon: Gamepad2,
    layout: "grid",
    description: "Camera gear for photography and videography",
    items: [
      {
        name: "Sony A7III",
        type: "Camera",
        details: "Full Frame mirrorless",
        image: "gear-pics/sony-a7iii.jpg",
      },
      {
        name: "Tamron 28-200mm f/2.8",
        type: "Lens",
        details: "Versatile zoom lens",
        image: "gear-pics/tamron-28-200.jpg",
      },
      {
        name: "Sony 55mm f/1.8",
        type: "Lens",
        details: "Prime lens",
        image: "gear-pics/sony-55m.jpg",
      },
      {
        name: "Fujifilm XT-3",
        type: "Camera",
        details: "Crop sensor mirrorless, previous camera",
        image: "gear-pics/fujifilm-xt3.jpg",
      },
    ],
  },
  {
    section: "Software & Tools",
    icon: HardDrive,
    layout: "grid",
    description: "Development and creative tools",
    items: [
      {
        name: "VSCode",
        type: "Editor",
        details: "Code editor",
        image: "gear-pics/Visual_Studio_Code_1.35_icon.svg.png",
      },
      {
        name: "Blender",
        type: "3D Modeling",
        details: "3D modeling & design",
        image: "gear-pics/Blender_logo_no_text.svg.png",
      },
      {
        name: "Godot",
        type: "Game Engine",
        details: "Game development",
        image: "gear-pics/Godot_icon.svg.png",
      },
      {
        name: "Rider",
        type: "IDE",
        details: "C# development",
        image: "gear-pics/JetBrains_Rider_Icon.svg.png",
      },
      {
        name: "Notion",
        type: "Productivity",
        details: "Notes & journalling",
        image: "gear-pics/Notion-logo.svg.png",
      },
      {
        name: "Spotify / SoundCloud",
        type: "Music",
        details: "Music streaming",
        image: "gear-pics/Spotify_logo_without_text.svg.png",
      },
      {
        name: "FilePilot X",
        type: "Utility",
        details: "Windows file explorer",
        image: "gear-pics/file-pilot.webp",
      },
      {
        name: "Tailscale",
        type: "VPN",
        details: "VPN & networking",
        image: "gear-pics/Microsoft.VisualStudio.Services.Icons.png",
      },
      {
        name: "Adobe Lightroom Classic",
        type: "Photo Editing",
        details: "Photo editing software",
        image: "gear-pics/Adobe_Lightroom_Classic_CC_2026_icon.svg.png",
      },
      {
        name: "Adobe Photoshop",
        type: "Image Editing",
        details: "Image editing software",
        image: "gear-pics/photoshop.png",
      },
      {
        name: "Adobe Premiere Pro",
        type: "Video Editing",
        details: "Video editing software",
        image: "gear-pics/premiere.png",
      },
      {
        name: "Adobe After Effects",
        type: "Motion Graphics",
        details: "Motion graphics software",
        image: "gear-pics/after effects.png",
      },
      {
        name: "Ableton Live",
        type: "Music Production",
        details: "Music production software",
        image: "gear-pics/ableton.webp",
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
            <h1 className="font-sans text-4xl font-bold text-foreground">
              Gear Rack
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Hardware and software I use for development, DJing, content
              creation, and production work.
            </p>
          </div>

          <div className="space-y-12">
            {gearSections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.section}>
                  <div className="flex items-center gap-2 mb-2">
                    {/* <Icon className="w-5 h-5 text-accent" /> */}
                    <h2 className="font-sans text-2xl font-semibold text-foreground">
                      {section.section}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    {section.description}
                  </p>

                  {section.layout === "grid" && section.items && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {section.items.map((item) => (
                        <Card
                          key={item.name}
                          className="overflow-hidden border-border bg-card hover:border-accent/50 transition-colors flex flex-col py-1"
                        >
                          {item.image ? (
                            <div className="flex gap-4 p-4">
                              <div className="flex-shrink-0 w-24 h-24 rounded overflow-hidden bg-transparent flex items-center justify-center">
                                <img
                                  src={getS3Url(item.image) || item.image}
                                  alt={item.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-sans text-sm font-medium text-foreground mb-1">
                                  {item.name}
                                </div>
                                <div className="font-mono text-xs text-accent mb-2">
                                  {item.type}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {item.details}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-4">
                              <div className="font-sans text-sm font-medium text-foreground mb-1">
                                {item.name}
                              </div>
                              <div className="font-mono text-xs text-accent mb-2">
                                {item.type}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item.details}
                              </div>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  )}

                  {section.layout === "specs" && section.specs && (
                    <Card className="p-6 border-border bg-card">
                      <div className="space-y-4">
                        {section.specs.map((spec, idx) => (
                          <div
                            key={idx}
                            className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0"
                          >
                            <div className="font-mono text-xs text-accent min-w-20 flex items-center">
                              {spec.label}
                            </div>
                            <div className="flex-1">
                              <div className="font-sans text-sm font-medium text-foreground">
                                {spec.value}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {spec.detail}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
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
