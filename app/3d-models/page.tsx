import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cable as Cube, Download, Eye } from "lucide-react";

export default function ModelsPage() {
  const models = [
    {
      name: "Tactical Shotgun",
      category: "Weapons",
      polycount: "1.2K tris",
      description: "Low-poly tactical shotgun with animated pump action",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Industrial Warehouse",
      category: "Environment",
      polycount: "5.8K tris",
      description: "Modular warehouse pieces for game environments",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Ammo Crate",
      category: "Props",
      polycount: "450 tris",
      description: "Optimized ammo crate with PBR textures",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Urban Street Pack",
      category: "Environment",
      polycount: "8.2K tris",
      description: "Complete street corner with props and details",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Sci-Fi Rifle",
      category: "Weapons",
      polycount: "2.1K tris",
      description: "Futuristic assault rifle with glow effects",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Forest Props Set",
      category: "Environment",
      polycount: "3.5K tris",
      description: "Trees, rocks, and vegetation for outdoor scenes",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-accent">&gt;</span> 3D MODELS
            </h1>
            <p className="text-muted-foreground">
              Low-poly 3D models for games and environments. Built in Blender,
              optimized for real-time rendering.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((model, i) => (
              <Card
                key={i}
                className="border-border bg-card hover-glow border-glow overflow-hidden"
              >
                <div className="relative aspect-video bg-muted">
                  <img
                    src={model.thumbnail || "/placeholder.svg"}
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="p-2 bg-background/80 rounded border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-background/80 rounded border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {model.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Cube className="w-3 h-3" />
                      <span>{model.polycount}</span>
                    </div>
                    <div className="px-2 py-0.5 bg-secondary border border-border">
                      {model.category.toUpperCase()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Three.js Viewer</CardTitle>
              <CardDescription>
                Interactive 3D model viewer would be rendered here using
                Three.js. Click on any model above to load it in this viewer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded border border-border flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Cube className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Select a model to view in 3D
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
}
