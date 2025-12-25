import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Camera, MapPin } from "lucide-react";

const photos = [
  {
    id: 1,
    title: "Urban Streets",
    location: "Tokyo, Japan",
    category: "Street",
    date: "2024",
  },
  {
    id: 2,
    title: "Mountain Range",
    location: "Swiss Alps",
    category: "Landscape",
    date: "2023",
  },
  {
    id: 3,
    title: "Film Grain",
    location: "New York City",
    category: "Film",
    date: "2024",
  },
  {
    id: 4,
    title: "Neon Nights",
    location: "Seoul, South Korea",
    category: "Street",
    date: "2023",
  },
  {
    id: 5,
    title: "Coastal Sunset",
    location: "Big Sur, California",
    category: "Landscape",
    date: "2024",
  },
  {
    id: 6,
    title: "Downtown",
    location: "San Francisco",
    category: "Street",
    date: "2024",
  },
];

export default function PhotographyPage() {
  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6 mb-12">
            <h1 className="font-sans text-4xl font-bold text-foreground">
              Photography
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Capturing moments through landscape, film, and street photography.
              Shot on Sony A7 IV.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <Card
                key={photo.id}
                className="group overflow-hidden border-border bg-card hover:border-accent/50 transition-all"
              >
                <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=400&width=600&query=photography+${photo.category.toLowerCase()}+${photo.title
                      .toLowerCase()
                      .replace(/\s+/g, "+")}`}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-sans text-sm font-medium text-foreground">
                      {photo.title}
                    </h3>
                    <Camera className="w-4 h-4 text-accent flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{photo.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accent">
                      {photo.category}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {photo.date}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 border border-border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-accent" />
              <h2 className="font-mono text-lg font-semibold text-foreground">
                Gear & Stats
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-1">
                  TOTAL PHOTOS
                </div>
                <div className="font-mono text-xl font-bold text-foreground">
                  23,491
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-1">
                  LOCATIONS
                </div>
                <div className="font-mono text-xl font-bold text-foreground">
                  47
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-1">
                  CAMERA
                </div>
                <div className="font-mono text-sm font-medium text-foreground">
                  Sony A7 IV
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-1">
                  FAVORITE LENS
                </div>
                <div className="font-mono text-sm font-medium text-foreground">
                  24-70mm f/2.8
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
