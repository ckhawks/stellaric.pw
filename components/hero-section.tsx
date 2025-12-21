import Link from "next/link";
import { ParticlesBackground } from "./particles-background";

export function HeroSection() {
  return (
    <section className="relative py-30 space-y-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <ParticlesBackground />
        {/* <div
          className="absolute inset-0 red-grid-animate"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.55 0.22 25 / 0.1) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.55 0.22 25 / 0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        /> */}
        {/* <div
          className="absolute top-1/3 left-1/5 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          style={{ transform: "translate(-50%, -50%)" }}
        /> */}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span>ONLINE</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
          <span className="text-foreground">STELLARIC</span>
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl">
          Developer, modder, UX designer, and multimedia creator. Building
          things across databases, games, web, and production tech.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-3 py-1 bg-secondary border border-border">
          DATABASE_ADMIN
        </span>
        <span className="px-3 py-1 bg-secondary border border-border">
          GAME_MODDING
        </span>
        <span className="px-3 py-1 bg-secondary border border-border">
          FULLSTACK_DEV
        </span>
        <span className="px-3 py-1 bg-secondary border border-border">
          UX_DESIGNER
        </span>
        <span className="px-3 py-1 bg-secondary border border-border">
          3D_MODELING
        </span>
        <span className="px-3 py-1 bg-secondary border border-border">
          VIDEO_PRODUCTION
        </span>
        <span className="px-3 py-1 bg-secondary border border-border text-success border-success">
          SYSTEM_ACTIVE
        </span>
      </div>

      {/* <div className="pt-4">
        <Link
          href="/metrics"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors group"
        >
          <span>View all metrics</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div> */}
    </section>
  );
}
