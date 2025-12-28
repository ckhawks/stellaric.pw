import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LightControlWidget } from "@/components/light-control-widget";

export default function LightPage() {
  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-8 pt-20">
          <div className="space-y-6 mb-12">
            <h1 className="font-sans text-4xl font-bold text-foreground">
              Light Control
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Control my apartment lighting with real-time color adjustments.
            </p>
          </div>
          <LightControlWidget />
        </main>
        <Footer />
      </div>
    </div>
  );
}
