import { GlitchTitle } from "./glitch-title";
import { ParticlesBackground } from "./particles-background";

export function HeroSection() {
  return (
    <section className="relative py-30 space-y-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ParticlesBackground />
      </div>

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

      <div className="space-y-4">
        {/* <div className="flex items-center gap-2 text-xs text-muted-foreground border-success border flex flex-row py-1 px-2 rounded-full w-min pr-3 bg-success/20 text-success dark:bg-black">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span>AVAILABLE</span>
        </div> */}

        <GlitchTitle />

        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl">
          Developer, modder, UX designer, and multimedia creator. Building
          things across databases, games, web, and production tech.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs mb-2">
        <span className="px-3 py-1 bg-secondary border border-border">
          FULLSTACK_DEV
        </span>
        <span className="px-3 py-1 bg-secondary border border-border">
          BROADCAST_PRODUCTION
        </span>
        <span className="px-3 py-1 bg-secondary border border-border">
          UX_DESIGN
        </span>
        <span className="px-3 py-1 bg-secondary border border-border">
          PHOTOGRAPHY
        </span>
        <span className="px-3 py-1 bg-secondary border border-border">
          GAME_MODDING
        </span>
        <span className="px-3 py-1 bg-secondary border border-border">
          3D_MODELING
        </span>
        <span className="px-3 py-1 bg-secondary border border-border">
          INFRA_OPS
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-xs mt-0">
        <span className="px-3 py-1 bg-secondary border border-border text-success border-success flex flex-row items-center gap-2 animate-pulse">
          <span
            className="w-2 h-2 bg-success rounded-full animate-pulse flex"
            // style={{ minWidth: "15px", width: "15px" }}
          />
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
