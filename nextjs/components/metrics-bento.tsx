import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Code, Zap, Database, ArrowRight } from "lucide-react";
import { TerminalText } from "@/components/terminal-text";

export function MetricsBento() {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between">
        {/* <h2 className="text-3xl font-bold">
          Metrics
        </h2> */}
        {/* <Link
          href="/metrics"
          className="text-sm text-muted-foreground hover:text-accent transition-colors font-mono"
        >
          view_all →
        </Link> */}
        {/* <Link
          href="/projects"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link> */}
      </div>

      {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card hover-glow border-glow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              COMMITS_THIS_MONTH
            </CardTitle>
            <Code className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">147</div>
            <p className="text-xs text-muted-foreground mt-1">
              +23% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card hover-glow border-glow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              ACTIVE_PROJECTS
            </CardTitle>
            <Zap className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across 4 domains
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card hover-glow border-glow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              BROADCASTS_PRODUCED
            </CardTitle>
            <Activity className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">This year</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card hover-glow border-glow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              DB_SCHEMAS_MANAGED
            </CardTitle>
            <Database className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Production systems
            </p>
          </CardContent>
        </Card>
      </div> */}

      <Card className="border-border bg-card md:bg-card/2 md:backdrop-blur">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
            <span>ACTIVITY_TIMELINE</span>
            <Link
              href="/activity"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                time: "2h ago",
                action: "Pushed to unity-mod-framework",
                type: "commit",
              },
              {
                time: "5h ago",
                action: "Published blog post on database indexing",
                type: "blog",
              },
              {
                time: "1d ago",
                action: "Completed 3D model: tactical shotgun",
                type: "3d",
              },
              {
                time: "2d ago",
                action: "Produced live broadcast for gaming tournament",
                type: "broadcast",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-16 text-xs text-muted-foreground shrink-0">
                  {item.time}
                </div>
                <div className="flex-1">
                  <TerminalText
                    text={item.action}
                    delay={i * 150}
                    glitch={true}
                    magic={true}
                    className="whitespace-normal"
                  />
                </div>
                <div className="text-xs px-2 py-0.5 bg-secondary border border-border shrink-0">
                  {item.type.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
