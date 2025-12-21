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
import { ExternalLink, GitBranch, Github } from "lucide-react";
import Link from "next/link";

const allProjects = [
  {
    title: "Unity Mod Framework",
    description:
      "Custom content modding framework for Unity games with asset loading and runtime injection.",
    longDescription:
      "A comprehensive modding framework that enables custom content creation for Unity-based games. Features include asset bundle loading, runtime script injection, and a plugin API for community extensions.",
    lastCommit: "2 days ago",
    tags: ["C#", "Unity", "Modding"],
    link: "#",
    github: "#",
  },
  {
    title: "Database Migration Tool",
    description:
      "Schema migration utility for PostgreSQL with rollback support and versioning.",
    longDescription:
      "Production-ready migration system for PostgreSQL databases. Handles schema versioning, automatic rollback on failure, and supports complex multi-step migrations.",
    lastCommit: "1 week ago",
    tags: ["PostgreSQL", "TypeScript", "CLI"],
    link: "#",
    github: "#",
  },
  {
    title: "Low Poly Asset Pack",
    description:
      "Collection of optimized 3D models for game environments - props, weapons, and structures.",
    longDescription:
      "Hand-crafted low poly 3D assets optimized for real-time rendering. Includes modular building pieces, weapons with PBR materials, and environment props.",
    lastCommit: "3 weeks ago",
    tags: ["Blender", "3D", "Game Assets"],
    link: "#",
    github: "#",
  },
  {
    title: "vMix Control Interface",
    description:
      "Web-based control panel for vMix video production with scene switching and replay management.",
    longDescription:
      "Real-time control interface for vMix production software. Enables remote scene switching, instant replay controls, and graphics management over WebSocket.",
    lastCommit: "5 days ago",
    tags: ["React", "WebSocket", "vMix"],
    link: "#",
    github: "#",
  },
  {
    title: "Godot Action RPG Framework",
    description:
      "Reusable framework for action RPG games in Godot with inventory, combat, and quest systems.",
    longDescription:
      "Complete RPG framework for Godot Engine including inventory management, real-time combat system, quest tracking, and save/load functionality.",
    lastCommit: "2 weeks ago",
    tags: ["Godot", "GDScript", "Game Dev"],
    link: "#",
    github: "#",
  },
  {
    title: "Web Scraping Toolkit",
    description:
      "Flexible scraping library with rate limiting, proxy rotation, and data extraction utilities.",
    longDescription:
      "Python toolkit for building reliable web scrapers. Features automatic rate limiting, proxy management, and declarative data extraction with CSS selectors.",
    lastCommit: "4 days ago",
    tags: ["Python", "Scraping", "Automation"],
    link: "#",
    github: "#",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">
                <span className="text-accent">&gt;</span> ALL_PROJECTS
              </h1>
              <p className="text-muted-foreground">
                A collection of things I've built across different domains.
              </p>
            </div>

            <div className="grid gap-6">
              {allProjects.map((project) => (
                <Card
                  key={project.title}
                  className="border-border bg-card hover:border-accent transition-colors group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <CardTitle className="text-xl group-hover:text-accent transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {project.longDescription}
                        </CardDescription>
                      </div>
                      <Link
                        href={project.github}
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
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
                  <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-3 h-3" />
                      <span>Last commit: {project.lastCommit}</span>
                    </div>
                    <Link
                      href={project.link}
                      className="flex items-center gap-1 hover:text-accent transition-colors"
                    >
                      View project
                      <ExternalLink className="w-3 h-3" />
                    </Link>
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
