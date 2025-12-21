import Link from "next/link";
import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projects = [
  {
    title: "Unity Mod Framework",
    description:
      "Custom content modding framework for Unity games with asset loading and runtime injection.",
    lastCommit: "2 days ago",
    tags: ["C#", "Unity", "Modding"],
    link: "#",
  },
  {
    title: "Database Migration Tool",
    description:
      "Schema migration utility for PostgreSQL with rollback support and versioning.",
    lastCommit: "1 week ago",
    tags: ["PostgreSQL", "TypeScript", "CLI"],
    link: "#",
  },
  {
    title: "Low Poly Asset Pack",
    description:
      "Collection of optimized 3D models for game environments - props, weapons, and structures.",
    lastCommit: "3 weeks ago",
    tags: ["Blender", "3D", "Game Assets"],
    link: "#",
  },
  {
    title: "vMix Control Interface",
    description:
      "Web-based control panel for vMix video production with scene switching and replay management.",
    lastCommit: "5 days ago",
    tags: ["React", "WebSocket", "vMix"],
    link: "#",
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
        {projects.map((project) => (
          <Card
            key={project.title}
            className="border-border bg-card hover:border-accent transition-colors group"
          >
            <CardHeader>
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
        ))}
      </div>
    </section>
  );
}
