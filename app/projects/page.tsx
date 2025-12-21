import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const allProjects = [
  {
    title: "Toaster's Rink & PuckStats.io",
    description:
      "Game servers for Puck with custom mods and comprehensive backend platform for stats, trading, and admin.",
    longDescription:
      "A set of game servers across the world running custom server and clientside mods. Puckstats.io tracks all data and acts as the backend, allowing users to trade items, view live server chats and status, view all-time stats, and manage bans/notes.",
    tags: [
      "Game Servers",
      "Full Stack",
      "Custom Mods",
      "Community",
      "C#",
      "Unity",
      "React",
      "Next.js",
      "PostgreSQL",
      "Websockets",
    ],
    website: "https://puckstats.io",
    isPrivate: true,
    year: 2025,
  },
  {
    title: "Puck Mods",
    description: "Collection of 22+ client and server mods for the game Puck.",
    longDescription:
      "Extensive suite of modifications for Puck including UI enhancements, spectator tools, chat features, stats overlays, server admin tools, and visual improvements.",
    tags: ["Game Mods", "C#", "Unity", "Community Tools"],
    link: "/projects/puck-mods",
    github: "https://github.com/ckhawks/ToasterCameras",
    isSubpage: true,
    year: 2025,
  },

  {
    title: "BigCalendar",
    description:
      "Display an entire year in one view by importing events from Google Calendar.",
    longDescription:
      "A unique calendar visualization that shows the entire year on a single page. Imports your events from Google Calendar and displays them in an innovative full-year view.",
    tags: [
      "Calendar",
      "React",
      "Next.js",
      "Google Calendar",
      "Data Visualization",
    ],
    github: "https://github.com/ckhawks/BigCalendar",
    year: 2025,
  },
  {
    title: "Taste Gallery",
    description: "Personal digital media collection and inspiration gallery.",
    longDescription:
      "A platform to serve all your collected and organized digital media as inspirations. A curated gallery of downloaded media organized for creative reference and inspiration.",
    tags: ["Gallery", "Media", "React", "Next.js", "Organization"],
    website: "https://taste.stlr.cx",
    github: "https://github.com/ckhawks/taste-gallery",
    year: "2024 - 2025",
    image: "project-thumbnails/taste2.png",
  },
  {
    title: "MemeCache",
    description:
      "Meme-sharing website with transcription and tagging for better discoverability.",
    longDescription:
      "Differentiated by the ability to transcribe and tag memes, allowing for better discoverability and searchability in your own library.",
    tags: ["Memes", "Web App", "React", "Next.js", "Social", "WIP"],
    website: "https://memecache.me",
    github: "https://github.com/ckhawks/MemeCache",
    status: "WIP - Invite Only",
    year: "2024 - 2025",
    image: "project-thumbnails/memecache1.png",
  },
  {
    title: "streamdeck-voice-notes",
    description:
      "Stream Deck buttons for transcribing voice notes to text notes.",
    longDescription:
      "Small scripts that can be added as Stream Deck buttons allowing you to transcribe voice notes directly to text notes.",
    tags: ["Stream Deck", "Automation", "Productivity", "Python"],
    github: "https://github.com/ckhawks/streamdeck-voice-notes",
    year: 2025,
  },
  {
    title: "Nexodus",
    description:
      "Sleek, minimalist web game focused on crafting, collecting, collaboration.",
    longDescription:
      "A social, text-based experience with a sleek minimalist black-and-white UI. Set in a futuristic society, players balance personal progression with contributions to a larger collective initiative. Blends intricate systems with incremental and mobile game mechanics.",
    tags: ["Web Game", "Crafting", "Social", "WIP"],
    github: "https://github.com/ckhawks/nexodus",
    status: "WIP",
    year: 2025,
    image: "project-thumbnails/nexodus1.png",
  },
  {
    title: "Trackers",
    description:
      "Unconventional productivity and mindfulness app for tracking incremental personal progress.",
    longDescription:
      "Define trackers for areas you want to progress in, then add progress events where you award yourself points. Over time, watch your progress tower grow and pass milestones.",
    tags: ["Productivity", "Mindfulness", "React", "Next.js", "Full Stack"],
    website: "https://tracker.stlr.cx",
    github: "https://github.com/ckhawks/trackers",
    year: 2024,
    image: "project-thumbnails/tracker3.png",
  },
  {
    title: "Omega Strikers Tracker",
    description:
      "Stats tracking and matchup analysis for Omega Strikers competitive play.",
    longDescription:
      "Website built to track Omega Strikers matches with friends and discover data about which strikers were best matchups, win rate, and map data.",
    tags: [
      "Game Stats",
      "React",
      "Next.js",
      "PostgreSQL",
      "Full Stack",
      "Data Analysis",
    ],
    website: "https://omegastrikers.stlr.cx",
    github: "https://github.com/ckhawks/omega-strikers-tracker",
    year: 2024,
    image: "project-thumbnails/os-bans.png",
  },
  {
    title: "Games Ratings List",
    description:
      "Collaborative all-time games rating list shared with friends (0-10 scale).",
    longDescription:
      "A social platform where you and your friends can rate your all-time favorite games on a 0-10 scale and see how your tastes compare.",
    tags: ["Social", "Games", "React", "Full Stack"],
    website: "https://games.stlr.cx",
    github: "https://github.com/ckhawks/games-list",
    year: 2024,
    image: "project-thumbnails/games1.png",
  },
  {
    title: "BetaReduxHelper",
    description:
      "CraftBukkit plugin suite for Minecraft Beta 1.7.3 server with Discord integration.",
    longDescription:
      "Plugin for BetaRedux Minecraft server (Beta 1.7.3 CraftBukkit 1060) with various utilities. Paired with Discord Socket integration for extended functionality.",
    tags: ["Minecraft Plugin", "Java", "CraftBukkit", "Discord Bot"],
    github: "https://github.com/ckhawks/BetaReduxHelper-DiscordSocket",
    year: 2024,
  },
  {
    title: "CartersZombies",
    description:
      "Top-down twin stick shooter inspired by Call of Duty Zombies.",
    longDescription:
      "A Godot-based top-down twin stick game heavily inspired by COD Zombies. Features fast-paced arcade gameplay with resource management and survival mechanics.",
    tags: ["Godot", "Game Dev", "GDScript", "Twin Stick"],
    github: "https://github.com/ckhawks/CartersZombies",
    year: 2024,
  },
  {
    title: "Hole-yoinker",
    description: "Godot game where you pull enemies into a hole.",
    longDescription:
      "A simple but engaging Godot game with a unique mechanic where you pull enemies into a hole. Physics-based gameplay with arcade-style challenge.",
    tags: ["Godot", "Game Dev", "GDScript", "Arcade"],
    github: "https://github.com/ckhawks/hole-yoinker",
    year: 2023,
  },
  {
    title: "Unquarried Stone",
    description:
      "Minecraft mod that restores Railcraft's Quarried Stone to 1.19+.",
    longDescription:
      "A Minecraft mod that adds back Railcraft's iconic Quarried Stone block to Minecraft 1.19 and newer versions.",
    tags: ["Minecraft Mod", "Java", "Modding"],
    github: "https://github.com/ckhawks/unquarried-stone",
    year: 2023,
  },
  {
    title: "Stellection",
    description:
      "Tag-based content aggregation, organization, and presentation platform.",
    longDescription:
      "An early-stage idea for a comprehensive platform to aggregate, organize, and present content using tag-based systems.",
    tags: ["Content Platform", "React", "Next.js", "PostgreSQL", "WIP"],
    website: "https://stellection.com",
    github: "https://github.com/ckhawks/Stellection",
    status: "Early Concept",
    year: 2023,
  },
  {
    title: "Discord Screenshot Emulator",
    description:
      "Create fake Discord screenshots from chat logs, with optional text-to-speech videos.",
    longDescription:
      "Generate convincing Discord chat screenshots from made-up chat logs. Can also create videos with text-to-speech.",
    tags: ["Discord", "Utility", "Python"],
    github: "https://github.com/ckhawks/discord-screenshot-emulator",
    year: 2021,
  },
  {
    title: "Grootebooks",
    description:
      "Automated tweet scraper that learns and generates new tweets periodically.",
    longDescription:
      "Scrape tweets from a Twitter account, apply machine learning to generate new tweets, and automatically post them periodically.",
    tags: ["Twitter Bot", "Python", "Machine Learning", "Automation"],
    github: "https://github.com/ckhawks/grootebooks",
    year: 2020,
  },
  {
    title: "Due Process League Website",
    description:
      "Website and dashboard for competitive league of the game Due Process.",
    longDescription:
      "A dedicated website and management dashboard for organizing competitive play in the game Due Process.",
    tags: ["Game League", "JavaScript", "Web App", "Full Stack"],
    website: "https://dueprocess.league",
    github: "https://github.com/ckhawks/DPLSite",
    year: "2020 - 2021",
  },
  {
    title: "stellaric.pw - Previous Iterations",
    description:
      "Archive of previous attempts to remake this portfolio website.",
    longDescription:
      "A collection of earlier versions and iterations of the stellaric.pw portfolio site.",
    tags: ["Web Design", "JavaScript", "CSS", "Portfolio", "Archive"],
    website: "https://new.stellaric.pw",
    github: "https://github.com/ckhawks/stellaric.pw",
    year: "2020 - 2023",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">
                {/* <span className="text-accent">&gt;</span> */}
                Projects
              </h1>
              <p className="text-muted-foreground">
                A collection of things I've built across different domains.
              </p>
            </div>

            <div
              // className="grid grid-cols-1 gap-6 md:grid-cols-2"
              className="columns-1 md:columns-2 gap-6"
            >
              {allProjects.map((project) => (
                <Card
                  key={project.title}
                  className={`border-border bg-card hover:border-accent transition-colors group gap-0 flex flex-col ${
                    project.image && "pt-0"
                  } mb-6`}
                >
                  {project.image && (
                    <div className="relative w-full max-h-64 overflow-hidden bg-secondary border-bottom border-border rounded-t-xl mb-4">
                      <Image
                        src={`https://s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_S3_BUCKET}/${project.image}`}
                        alt={project.title}
                        width={500}
                        height={400}
                        className="w-full h-auto rounded-t-xl"
                        priority={false}
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <CardTitle className="text-xl group-hover:text-accent transition-colors flex items-center gap-2">
                          {project.title}
                          {project.status && (
                            <span className="text-xs text-accent font-medium whitespace-nowrap">
                              {project.status}
                            </span>
                          )}
                        </CardTitle>
                        {project.year && (
                          <span className="text-xs text-muted-foreground ml-auto">
                            {project.year}
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-muted-foreground">
                        {project.longDescription}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className={"mt-auto"}>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-secondary border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between gap-2 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      {project.website && (
                        <Link
                          href={project.website}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-foreground bg-secondary hover:bg-accent hover:text-background transition-colors rounded"
                          target="_blank"
                        >
                          Website
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                      {project.github && project.github !== "#" && (
                        <Link
                          href={project.github}
                          className="text-muted-foreground hover:text-accent transition-colors p-1 text-xs inline-flex items-center gap-1"
                          target="_blank"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </Link>
                      )}
                      {project.isSubpage && project.link && (
                        <Link
                          href={project.link}
                          className="text-muted-foreground hover:text-accent transition-colors p-1 text-xs"
                        >
                          View mods
                        </Link>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
