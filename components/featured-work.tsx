import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Camera, Palette, ArrowRight } from "lucide-react"

export function FeaturedWork() {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-2xl font-bold text-foreground">Featured Work</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Photography Feature */}
        <Link href="/photography">
          <Card className="group p-6 border-border bg-card hover:border-accent/50 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="w-5 h-5 text-accent" />
                  <h3 className="font-mono text-lg font-semibold text-foreground">Photography</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Landscape, film, and street photography from around the world.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
            <div className="aspect-video bg-secondary rounded overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Photography showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-4 font-mono text-xs text-muted-foreground">
              23,491 photos • Sony A7 IV • 47 locations
            </div>
          </Card>
        </Link>

        {/* UX Design Feature */}
        <Card className="group p-6 border-border bg-card hover:border-accent/50 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-5 h-5 text-accent" />
                <h3 className="font-mono text-lg font-semibold text-foreground">UX Design</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Interface design and user experience work for web and mobile.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
          </div>
          <div className="aspect-video bg-secondary rounded overflow-hidden flex items-center justify-center">
            <div className="text-center p-8">
              <Palette className="w-12 h-12 text-accent mx-auto mb-4" />
              <p className="font-mono text-sm text-muted-foreground">Design portfolio coming soon</p>
            </div>
          </div>
          <div className="mt-4 font-mono text-xs text-muted-foreground">
            Design systems • Web apps • Mobile interfaces
          </div>
        </Card>
      </div>
    </section>
  )
}
