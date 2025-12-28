"use client";

import React, { useState, Suspense } from "react";
import ModelViewerCanvas from "./model-viewer-canvas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Grid3x3, RotateCw } from "lucide-react";

interface Model {
  name: string;
  file: string;
  polycount: string;
  useMatcap?: boolean;
}

interface ModelViewerModalProps {
  model: Model | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ModelViewerModal({
  model,
  isOpen,
  onClose,
}: ModelViewerModalProps) {
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  if (!model) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-none w-[95vw] h-[85vh] p-0 flex flex-col border-border bg-card">
        <DialogHeader className="border-b border-border px-6 py-4">
          <DialogTitle>{model.name}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 relative overflow-hidden">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full bg-muted">
                <p className="text-muted-foreground">Loading 3D viewer...</p>
              </div>
            }
          >
            <ModelViewerCanvas
              model={model}
              wireframe={wireframe}
              autoRotate={autoRotate}
            />
          </Suspense>
        </div>

        <div className="border-t border-border px-6 py-4 flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">{model.polycount}</div>
          <div className="flex items-center gap-2">
            <Button
              variant={wireframe ? "default" : "outline"}
              size="sm"
              onClick={() => setWireframe(!wireframe)}
              className={
                wireframe
                  ? "border-border hover:bg-accent hover:text-accent-foreground"
                  : "border-border hover:bg-secondary"
              }
            >
              <Grid3x3 className="w-4 h-4 mr-2" />
              Wireframe
            </Button>
            <Button
              variant={autoRotate ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoRotate(!autoRotate)}
              className={
                autoRotate
                  ? "border-border hover:bg-accent hover:text-accent-foreground"
                  : "border-border hover:bg-tertiary"
              }
            >
              <RotateCw className="w-4 h-4 mr-2" />
              Auto Rotate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
