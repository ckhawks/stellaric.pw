import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">
                {/* <span className="text-accent">&gt;</span> */}
                About
              </h1>
            </div>

            <Card className="border-border bg-card p-8">
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  I go by <span className="text-foreground">Stellaric</span>{" "}
                  online.
                </p>

                <p>
                  Started coding as a kid messing with game mods and server
                  configs. That curiosity led me down the rabbit hole of
                  databases, web development, and building tools that solve
                  actual problems.
                </p>

                <p>
                  On the technical side, I've spent time on database design and
                  administration, game modding (mostly Unity content mods),
                  fullstack web development, and infrastructure work. I like
                  scripting things that automate boring tasks, building bots
                  that scrape data, and designing interfaces that don't suck.
                </p>

                <p>
                  Outside of pure code, I'm into 3D modeling - specifically low
                  poly stuff for games (weapons, props, environments). I do
                  event video production, handling everything from technical
                  directing to replays and graphics in vMix. Photography is
                  another outlet (landscape, film, street), along with DJing and
                  a bit of music production.
                </p>

                <p>
                  Recently got into stage lighting and production. Just picked
                  up a WolfMix WMX1 DMX controller and have been experimenting
                  with TouchDesigner for reactive lighting shows.
                </p>

                <p>
                  For games, I'm drawn to fast-paced mechanical ones that test
                  reflexes, and deep crafting/simulation games where you can
                  lose hours optimizing systems.
                </p>

                <p>
                  I also spend time on community management and archiving
                  digital media that inspires me. If something catches my
                  interest, I usually end up building something around it or
                  digging until I understand how it works.
                </p>

                <div className="pt-4 border-t border-border mt-8">
                  <p className="text-foreground">
                    This site is where I put things I've made and ramble about
                    stuff I'm working on.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
