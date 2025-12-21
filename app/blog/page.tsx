import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const posts = [
  {
    title: "Database Indexing Strategies for High Traffic Apps",
    description:
      "Thoughts on building efficient database indexes for applications that need to scale.",
    date: "2024-03-15",
    tags: ["Database", "Performance"],
    slug: "database-indexing-strategies",
  },
  {
    title: "Unity Modding: Runtime Asset Injection",
    description:
      "How to inject custom assets into Unity games at runtime without modifying game files.",
    date: "2024-03-10",
    tags: ["Unity", "Modding"],
    slug: "unity-runtime-asset-injection",
  },
  {
    title: "Building a vMix Control Panel",
    description:
      "Creating a web-based control interface for live video production with WebSockets.",
    date: "2024-03-05",
    tags: ["Production", "WebSocket"],
    slug: "vmix-control-panel",
  },
  {
    title: "Low Poly Modeling for Games",
    description:
      "My workflow for creating optimized 3D assets that look good and run fast.",
    date: "2024-02-28",
    tags: ["3D", "Game Dev"],
    slug: "low-poly-modeling",
  },
  {
    title: "TouchDesigner for Stage Lighting",
    description:
      "Using TouchDesigner to create reactive lighting shows controlled via DMX.",
    date: "2024-02-20",
    tags: ["Lighting", "TouchDesigner"],
    slug: "touchdesigner-stage-lighting",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">
                <span className="text-accent">&gt;</span> BLOG
              </h1>
              <p className="text-muted-foreground">
                Random thoughts and notes on things I'm working on.
              </p>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="border-border bg-card hover:border-accent transition-colors group">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <CardTitle className="text-xl group-hover:text-accent transition-colors">
                          {post.title}
                        </CardTitle>
                        <time className="text-xs text-muted-foreground shrink-0 mt-1">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <CardDescription className="text-muted-foreground">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-secondary border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
