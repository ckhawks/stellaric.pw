import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ExternalLink,
  Star,
  Github,
  Twitter,
  Youtube,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

export default function LinksPage() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/stellaric",
      icon: Github,
      color: "text-foreground",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/stellaric",
      icon: Twitter,
      color: "text-blue-500",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@stellaric",
      icon: Youtube,
      color: "text-accent",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/stellaric",
      icon: Linkedin,
      color: "text-blue-600",
    },
  ];

  const favoriteLinks = [
    {
      title: "Hacker News",
      url: "https://news.ycombinator.com",
      description: "Essential tech reading",
    },
    {
      title: "Godot Docs",
      url: "https://docs.godotengine.org",
      description: "Game dev reference",
    },
    {
      title: "TouchDesigner Forum",
      url: "https://forum.derivative.ca",
      description: "Visual programming community",
    },
    {
      title: "Low Poly Lab",
      url: "https://www.youtube.com/@lowpolylab",
      description: "3D modeling inspiration",
    },
    {
      title: "Database Weekly",
      url: "https://dbweekly.com",
      description: "Database tech newsletter",
    },
    {
      title: "vmix Forums",
      url: "https://forums.vmix.com",
      description: "Video production discussions",
    },
  ];

  const currentVibes = [
    { text: "loving the new Godot 4.3 features, physics is so smooth now" },
    { text: "just got my DMX controller, lighting control is addictive" },
    { text: "rewatching old SGDQ runs for the 100th time" },
    { text: "postgres explain analyze is my new favorite debugging tool" },
  ];

  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-accent">&gt;</span> LINKS
            </h1>
            <p className="text-muted-foreground">
              Connect with me and check out the links I actually use.
            </p>
          </div>

          {/* Social Links */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Find me on</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="border-border bg-card hover-glow border-glow cursor-pointer h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <link.icon className={`w-6 h-6 ${link.color}`} />
                        <span>{link.name}</span>
                        <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Favorite Links */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Links I actually use</h2>
            <div className="space-y-4">
              {favoriteLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="border-border bg-card hover-glow border-glow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">
                            {link.title}
                          </CardTitle>
                          <CardDescription>{link.description}</CardDescription>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Current Vibes */}
          <section>
            <h2 className="text-2xl font-bold mb-6">
              <span className="text-accent">#</span> Current vibes
            </h2>
            <Card className="border-border bg-card">
              <CardContent className="pt-6 space-y-4">
                {currentVibes.map((vibe, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <Star className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{vibe.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
