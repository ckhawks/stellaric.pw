import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

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
              {/*
                Replaced the inner paragraphs of the Card with a refined, factual first-person bio.
              */}
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  I go by{" "}
                  <Link
                    href="/"
                    className="text-foreground font-semibold underline hover:text-accent"
                  >
                    Stellaric
                  </Link>{" "}
                  online. I like to make things.
                </p>

                <p>
                  I'm a soft, emotional-but-logical person with ADHD, autism,
                  and a little bit of depression. Making things keeps my brain
                  from spiraling, and finishing them, whether for one friend or
                  a thousand players, is what actually feels good. It's really
                  fun for me to take a stupid idea and go overkill with it.
                  That's the reason this site has{" "}
                  <Link
                    href="/metrics"
                    className="text-foreground underline hover:text-accent"
                  >
                    metrics
                  </Link>
                  , a live chat, or a way to control a light bulb in my home. I
                  also like building things that help people. I'm quite proud of
                  how far I've come with the things I've made and the
                  communities I've established.
                </p>

                <p>
                  I started tinkering with simple HTML and Python as a kid,
                  learning from my mom and dad. I grew up on Legos, video games,
                  and shows like iCarly — I dreamed of being a video producer
                  like Freddie, which is definitely where some of my production
                  and web development interests began.
                </p>

                <p>
                  A big chunk of my time in my teen years was spent running
                  Minecraft servers. That’s where I started learning Java by
                  writing small plugins, along with community management,
                  moderation, and graphic design through a lot of trial and
                  error.
                </p>

                <p>
                  Most of my game modding work has been centered on{" "}
                  <Link
                    href="https://store.steampowered.com/app/2994020/Puck/"
                    className="text-foreground underline hover:text-accent"
                    target="_blank"
                  >
                    Puck
                  </Link>
                  , a multiplayer first‑person hockey physics game. I pioneered
                  the game's modding community — growing{" "}
                  <Link
                    className="text-foreground underline hover:text-accent"
                    href="https://discord.gg/sd4DxKra7T"
                    target="_blank"
                  >
                    a Discord community
                  </Link>{" "}
                  to 2,000+ members, supporting{" "}
                  <Link
                    href="https://puckstats.io/stats"
                    className="text-foreground underline hover:text-accent"
                    target="_blank"
                  >
                    50k+ unique players on my servers
                  </Link>
                  , and{" "}
                  <Link
                    className="text-foreground underline hover:text-accent"
                    href="https://steamcommunity.com/id/ckhawks/myworkshopfiles/?appid=2994020"
                    target="_blank"
                  >
                    releasing 20+ public client and server mods
                  </Link>
                  . I’ve also shipped small mods for other titles and done some
                  hobby game development in Godot (but nothing published yet).
                </p>

                <p>
                  On the production side, I’ve focused heavily on{" "}
                  <Link
                    href="/broadcasts"
                    className="text-foreground underline hover:text-accent"
                  >
                    esports events
                  </Link>
                  , though I’m interested in traditional sports as well. I work
                  behind the camera doing replays, technical directing,
                  observing, and graphics. I also enjoy the engineering side of
                  events and figuring out how to optimize systems to put on a
                  better show.
                </p>

                <p>
                  I care a lot about user‑centered design and crafting beautiful
                  functional interfaces and experiences. I often build{" "}
                  <Link
                    href="/projects"
                    className="text-foreground underline hover:text-accent"
                  >
                    projects
                  </Link>{" "}
                  to solve problems I personally run into, and I’m big on
                  digital media—collecting inspiration and feeding my creative
                  side through{" "}
                  <Link
                    href="/photography"
                    className="text-foreground underline hover:text-accent"
                  >
                    photography
                  </Link>{" "}
                  and visual design.
                </p>

                <p>
                  I also do{" "}
                  <Link
                    href="/3d-models"
                    className="text-foreground underline hover:text-accent"
                  >
                    low‑poly 3D modeling
                  </Link>{" "}
                  for weapons, props, and environments, mostly modern or
                  near‑future sci‑fi for worldbuilding and game development.
                </p>

                <p>
                  Development‑wise, I’m comfortable across frontend, backend,
                  databases, and infrastructure. I like running with new{" "}
                  <Link
                    href="/projects"
                    className="text-foreground underline hover:text-accent"
                  >
                    project ideas
                  </Link>{" "}
                  and seeing how far I can push them.
                </p>

                <p>
                  I{" "}
                  <Link
                    href="/dj-sets"
                    className="text-foreground underline hover:text-accent"
                  >
                    DJ very casually
                  </Link>{" "}
                  and play small events sometimes. Lately I’ve been learning
                  entry‑level stage lighting and TouchDesigner to try to level
                  up my silly shows production value.
                </p>

                <p>
                  TL;DR: I like making things across production, development,
                  and design. Wide skillset, hands‑on problem solver, and always
                  curious.
                </p>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
