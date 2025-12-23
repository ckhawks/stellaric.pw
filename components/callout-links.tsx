"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DiscordModal } from "@/components/discord-modal";
import { DiscordIcon } from "@/components/icons/discord-icon";
import {
  Users,
  Palette,
  Camera,
  Gamepad2,
  ExternalLink,
  Github,
  Twitter,
  Youtube,
  ArrowRight,
} from "lucide-react";

interface Callout {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  hrefText?: string;
  external?: boolean;
}

const callouts: Callout[] = [
  {
    title: "Toaster's Rink",
    description:
      "My personal modding and game server community Discord with 2k+ members for physics-based hockey game Puck",
    icon: Users,
    href: "https://discord.gg/mCmX5dwzsj",
    hrefText: "Join Discord",
    external: true,
  },
  {
    title: "Photography",
    description:
      "My portfolio featuring landscape, street, film, and travel photography",
    icon: Camera,
    href: "https://photos.stlr.cx",
    hrefText: "View Photos",
    external: true,
  },
  {
    title: "Taste",
    description: "My personal digital media inspiration collection",
    icon: Palette,
    href: "https://taste.stlr.cx",
    hrefText: "Browse Inspiration",
    external: true,
  },
  {
    title: "Stellaric's Steam Workshop",
    description: "20+ public Puck mods and modifications",
    icon: Gamepad2,
    href: "https://steamcommunity.com/id/ckhawks/myworkshopfiles/?appid=2994020&sort=score&browsefilter=myfiles&view=imagewall&p=1&numperpage=30",
    hrefText: "View Mods",
    external: true,
  },
];

const socialLinks = [
  {
    name: "Discord",
    url: "#",
    icon: DiscordIcon,
    color: "text-slate-500",
    external: false,
    isModal: true,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/stellaricpw",
    icon: Twitter,
    color: "text-blue-500",
    external: true,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@stellaric7822",
    icon: Youtube,
    color: "text-accent",
    external: true,
  },
  {
    name: "GitHub",
    url: "https://github.com/ckhawks",
    icon: Github,
    color: "text-foreground",
    external: true,
  },
];

export function CalloutLinks() {
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState(false);

  return (
    <section className="space-y-8">
      {/* <h2 className="text-3xl font-bold">Featured Projects</h2> */}
      <div className="grid gap-4 sm:grid-cols-2">
        {callouts.map((callout) => {
          const Icon = callout.icon;
          const Component = callout.external ? "a" : Link;

          return (
            <Component
              key={callout.title}
              href={callout.href}
              target={callout.external ? "_blank" : undefined}
              rel={callout.external ? "noopener noreferrer" : undefined}
              className="group"
            >
              <Card className="h-full border border-border backdrop-blur bg-gradient-to-br/2 from-card to-card/50 hover:from-accent/10 hover:to-card/80 hover:border-accent shadow-lg hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 cursor-pointer overflow-hidden group/card">
                {/* <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-transparent group-hover/card:from-accent/10 transition-all duration-300" /> */}
                <div className="relative p-6 flex flex-col h-full gap-4">
                  <div className="flex items-center justify-between">
                    <Icon className="w-10 h-10 group-hover/card:text-accent group-hover/card:scale-110 group-hover/card:drop-shadow-lg transition-all duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg group-hover/card:text-accent transition-colors">
                      {callout.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {callout.description}
                    </p>
                  </div>
                  {callout.external && (
                    <div className="flex items-center gap-2 group-hover/card:text-accent transition-all">
                      <span className="text-sm text-muted-foreground group-hover/card:text-accent">
                        {callout.hrefText}
                      </span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/card:text-accent transition-all opacity-60 group-hover/card:opacity-100" />
                    </div>
                  )}
                </div>
              </Card>
            </Component>
          );
        })}
      </div>
      {/* Social Links */}
      <section>
        {/* <h2 className="text-2xl font-bold mb-6">Find me on</h2> */}
        <div className="grid gap-4 sm:grid-cols-2">
          {socialLinks.map((link) => {
            const Component = link.isModal ? "button" : Link;
            const componentProps = link.isModal
              ? {
                  onClick: () => setIsDiscordModalOpen(true),
                  className:
                    "w-full text-left border-border bg-card/5 backdrop-blur hover:border-accent hover:shadow-xl hover:shadow-accent/20 cursor-pointer h-full transition-all",
                }
              : {
                  href: link.url,
                  target: "_blank" as const,
                  rel: "noopener noreferrer",
                };

            return (
              <Component
                key={link.name}
                {...(link.isModal
                  ? {
                      onClick: () => setIsDiscordModalOpen(true),
                      className: "w-full text-left",
                    }
                  : {
                      href: link.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
              >
                <Card className="border-border bg-card/5 backdrop-blur hover:border-accent hover:shadow-xl hover:shadow-accent/20 cursor-pointer h-full transition-all group/card">
                  <CardHeader className="flex items-center gap-3">
                    <link.icon className={`w-6 h-6 ${link.color}`} />
                    <span>{link.name}</span>
                    {link.external && (
                      <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground group-hover/card:text-accent transition-all" />
                    )}
                    {!link.external && link.isModal && (
                      <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover/card:text-accent transition-all" />
                    )}
                  </CardHeader>
                </Card>
              </Component>
            );
          })}
        </div>
      </section>

      <DiscordModal
        isOpen={isDiscordModalOpen}
        onClose={() => setIsDiscordModalOpen(false)}
      />
    </section>
  );
}
