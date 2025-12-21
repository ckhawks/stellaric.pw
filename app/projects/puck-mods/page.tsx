import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Github } from "lucide-react";
import Link from "next/link";

const puckMods = [
  {
    title: "ToastersReskinLoader",
    description: "Load and share reskin packs to customize the game visually",
    github: "https://github.com/ckhawks/ToastersReskinLoader",
    type: "Client",
  },
  {
    title: "ToasterQuickChatPlus",
    description:
      "Expand quick chat experience with 100+ additional quick chats and UI customization",
    github: "https://github.com/ckhawks/ToasterQuickChatPlus",
    type: "Client",
  },
  {
    title: "ToasterCameras",
    description: "Extended spectator cameras for better viewing angles",
    github: "https://github.com/ckhawks/ToasterCameras",
    type: "Client",
  },
  {
    title: "ToasterPuckFX",
    description:
      "Modify puck outline, verticality indicators, and add puck trail effects",
    github: "https://github.com/ckhawks/ToasterPuckFX",
    type: "Client",
  },
  {
    title: "ToastersRinkCompanion",
    description: "Exclusive functionality for Toaster's Rink servers",
    github: "https://github.com/ckhawks/ToastersRinkCompanion",
    type: "Client",
  },
  {
    title: "ToasterHideLockedServers",
    description:
      "Add UI element to hide password-protected servers from server browser",
    github: "https://github.com/ckhawks/ToasterHideLockedServers",
    type: "Client",
  },
  {
    title: "ToasterSticksOnMinimap",
    description: "Add stick indicators to the player's minimap",
    github: "https://github.com/ckhawks/ToasterSticksOnMinimap",
    type: "Client",
  },
  {
    title: "ToasterVoiceChatUI",
    description:
      "HUD UI element to show when players are using voice chat in game",
    github: "https://github.com/ckhawks/ToasterVoiceChatUI",
    type: "Client",
  },
  {
    title: "ToasterServerBrowser",
    description: "Access server browser while connected to a server",
    github: "https://github.com/ckhawks/ToasterServerBrowser",
    type: "Client",
  },
  {
    title: "ToasterTeamIndicator",
    description: "HUD UI element showing which team you're on",
    github: "https://github.com/ckhawks/ToasterTeamIndicator",
    type: "Client",
  },
  {
    title: "ToasterStatsOverlay",
    description: "Display FPS, Ping, and Packet Loss in-game",
    github: "https://github.com/ckhawks/ToasterStatsOverlay",
    type: "Client",
  },
  {
    title: "ToasterSilenceQuickChat",
    description: "Toggle sending and receiving quick chats",
    github: "https://github.com/ckhawks/ToasterSilenceQuickChat",
    type: "Client",
  },
  {
    title: "ToasterTallerChat",
    description: "Make chat taller with configurable height",
    github: "https://github.com/ckhawks/ToasterTallerChat",
    type: "Client",
  },
  {
    title: "ToasterCrispyShadows",
    description: "Enhance shadow quality",
    github: "https://github.com/ckhawks/ToasterCrispyShadows",
    type: "Client",
  },
  {
    title: "ToasterCellyCam",
    description: "Modify replay camera to highlight the scoring player",
    github: "https://github.com/ckhawks/ToasterCellyCam",
    type: "Client",
  },
  {
    title: "ToasterConsole",
    description: "In-game debug console",
    github: "https://github.com/ckhawks/ToasterConsole",
    type: "Client",
  },
  {
    title: "ToasterSpectatorJerseys",
    description: "Replace spectator jerseys with only their own jersey",
    github: "https://github.com/ckhawks/ToasterSpectatorJerseys",
    type: "Client",
  },
  {
    title: "ToasterConnectWhileFull",
    description: "Enable server admins to connect to full dedicated servers",
    github: "https://github.com/ckhawks/ToasterConnectWhileFull",
    type: "Client",
  },
  {
    title: "ToasterFasterStickSpeed",
    description: "Make stick move faster",
    github: "https://github.com/ckhawks/ToasterFasterStickSpeed",
    type: "Server",
  },
  {
    title: "ToasterServerCrashExploitPatch",
    description: "Fix exploit used to crash/lock up servers",
    github: "https://github.com/ckhawks/ToasterServerCrashExploitPatch",
    type: "Server",
  },
  {
    title: "ToasterHeresMyMods",
    description: "Report what mods connecting clients are running",
    github: "https://github.com/ckhawks/ToasterHeresMyMods",
    type: "Server",
  },
  {
    title: "ToasterServerKillSwitch",
    description: "Enable server admins to force stop servers from inside",
    github: "https://github.com/ckhawks/ToasterServerKillSwitch",
    type: "Server",
  },
];

export default function PuckModsPage() {
  const clientMods = puckMods.filter((mod) => mod.type === "Client");
  const serverMods = puckMods.filter((mod) => mod.type === "Server");

  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <Link
                href="/projects"
                className="text-muted-foreground hover:text-accent transition-colors text-sm flex flex-row items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
              </Link>
              <h1 className="text-4xl font-bold">Puck Mods</h1>
              <p className="text-muted-foreground">
                A collection of client and server mods for the game Puck.
              </p>
            </div>

            {/* Client Mods */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Client Mods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {clientMods.map((mod) => (
                  <Card
                    key={mod.title}
                    className="border-border bg-card hover:border-accent transition-colors group"
                  >
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <CardTitle className="text-lg group-hover:text-accent transition-colors">
                            {mod.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {mod.description}
                          </CardDescription>
                        </div>
                        <Link
                          href={mod.github}
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </Link>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Server Mods */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Server Mods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {serverMods.map((mod) => (
                  <Card
                    key={mod.title}
                    className="border-border bg-card hover:border-accent transition-colors group"
                  >
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <CardTitle className="text-lg group-hover:text-accent transition-colors">
                            {mod.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {mod.description}
                          </CardDescription>
                        </div>
                        <Link
                          href={mod.github}
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </Link>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
