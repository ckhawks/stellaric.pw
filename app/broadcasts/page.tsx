import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const broadcasts = [
  {
    event: "Spring Gaming Championship 2024",
    role: "Technical Director & Graphics",
    date: "2024-03-18",
    duration: "8 hours",
    details: "Multi-camera production with instant replays, live graphics, and remote commentary integration",
  },
  {
    event: "Community Tournament Series #12",
    role: "TD, Replays, Engineering",
    date: "2024-03-10",
    duration: "6 hours",
    details: "Live tournament coverage with player cams, game capture, and automated score overlays",
  },
  {
    event: "Charity Gaming Marathon",
    role: "Producer & Engineer",
    date: "2024-02-25",
    duration: "24 hours",
    details: "24-hour charity stream with donation tracking, multiple game feeds, and guest segments",
  },
  {
    event: "Regional Esports Qualifier",
    role: "Technical Director",
    date: "2024-02-18",
    duration: "10 hours",
    details: "High-stakes qualifier with multi-angle coverage and real-time statistics integration",
  },
  {
    event: "Local LAN Event Finals",
    role: "TD & Replay Operator",
    date: "2024-02-05",
    duration: "5 hours",
    details: "Finals coverage with instant replay highlights and crowd camera feeds",
  },
  {
    event: "Community Showmatch Series #11",
    role: "Graphics & Engineering",
    date: "2024-01-28",
    duration: "4 hours",
    details: "Custom graphics package and automated scene switching for showmatch series",
  },
]

export default function BroadcastsPage() {
  return (
    <div className="min-h-screen grid-pattern">
      <div className="scanlines">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">
                <span className="text-accent">&gt;</span> BROADCAST_HISTORY
              </h1>
              <p className="text-muted-foreground">
                Event video production work - technical directing, replays, engineering, and graphics.
              </p>
            </div>

            <div className="space-y-4">
              {broadcasts.map((broadcast, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-lg">{broadcast.event}</CardTitle>
                      <time className="text-xs text-muted-foreground shrink-0">
                        {new Date(broadcast.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">ROLE:</span>
                        <span className="text-foreground">{broadcast.role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">DURATION:</span>
                        <span className="text-foreground">{broadcast.duration}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{broadcast.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
