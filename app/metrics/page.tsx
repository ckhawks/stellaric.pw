import { Header } from "@/components/header"
import { MetricsGrid } from "@/components/metrics-grid"

export default function MetricsPage() {
  return (
    <div className="min-h-screen grid-pattern pb-10">
      <div className="scanlines">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6 mb-12">
            <h1 className="font-mono text-4xl font-bold text-foreground">System Metrics</h1>
            <p className="text-muted-foreground max-w-2xl">
              Live telemetry and performance data across systems. Updated in real-time.
            </p>
          </div>
          <MetricsGrid />
        </main>
      </div>
    </div>
  )
}
