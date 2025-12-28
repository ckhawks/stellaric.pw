"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ModelViewerModal } from "./model-viewer-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Triangle } from "lucide-react";
import modelsData from "@/data/models.json";

interface Model {
  id: string;
  name: string;
  category: string;
  polycount: string;
  description: string;
  thumbnail: string;
  file: string;
  useMatcap?: boolean;
}

export default function ModelsPage() {
  const models: Model[] = modelsData.models;
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleViewModel = (model: Model) => {
    setSelectedModel(model);
    setIsViewerOpen(true);
  };

  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pt-20 pb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {/* <span className="text-accent">&gt;</span> */}
              3D Models
            </h1>
            <p className="text-muted-foreground">
              Low-poly 3D models for games and environments. Built in Blender.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <Card
                key={model.id}
                className="group border-border bg-card hover:border-accent overflow-hidden cursor-pointer transition-colors"
                onClick={() => handleViewModel(model)}
              >
                <div className="relative aspect-video bg-muted">
                  <img
                    src={model.thumbnail || "/placeholder.svg"}
                    alt={model.name}
                    className="w-full h-full object-cover transition-all group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg transition-colors group-hover:text-accent">
                        {model.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {model.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground ">
                    <div className="px-2 py-0.5 bg-secondary border border-border">
                      {model.category.toUpperCase()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Triangle className="w-3 h-3" />
                      <span>{model.polycount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
      <ModelViewerModal
        model={selectedModel}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </div>
  );
}
