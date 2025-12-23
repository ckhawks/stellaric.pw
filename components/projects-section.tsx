import Link from "next/link";
import { ArrowRight, ExternalLink, GitBranch, Code2, Database, Box, Radio } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Project {
  title: string;
  description: string;
  lastCommit: string;
  tags: string[];
  link: string;
  icon: React.ComponentType<{ className?: string }>;
}

const projects: Project[] = [
  {
    title: "Unity Mod Framework",
    description:
      "Custom content modding framework for Unity games with asset loading and runtime injection.",
    lastCommit: "2 days ago",
    tags: ["C#", "Unity", "Modding"],
    link: "#",
    icon: Code2,
  },
  {
    title: "Database Migration Tool",
    description:
      "Schema migration utility for PostgreSQL with rollback support and versioning.",
    lastCommit: "1 week ago",
    tags: ["PostgreSQL", "TypeScript", "CLI"],
    link: "#",
    icon: Database,
  },
  {
    title: "Low Poly Asset Pack",
    description:
      "Collection of optimized 3D models for game environments - props, weapons, and structures.",
    lastCommit: "3 weeks ago",
    tags: ["Blender", "3D", "Game Assets"],
    link: "#",
    icon: Box,
  },
  {
    title: "vMix Control Interface",
    description:
      "Web-based control panel for vMix video production with scene switching and replay management.",
    lastCommit: "5 days ago",
    tags: ["React", "WebSocket", "vMix"],
    link: "#",
    icon: Radio,
  },
];

export function ProjectsSection() {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold">
          {/* <span className="text-accent">▴</span> */}
          Projects
        </h2>
        <Link
          href="/projects"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          View all
          {/* <ExternalLink className="w-3 h-3" /> */}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <Card
              key={project.title}
              className="border-border bg-card hover:border-accent hover:bg-accent/5 transition-all group"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Icon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-lg group-hover:text-accent transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
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
              <CardFooter className="text-xs text-muted-foreground flex items-center gap-2">
                <GitBranch className="w-3 h-3" />
                <span>Last commit: {project.lastCommit}</span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
