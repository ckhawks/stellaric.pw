import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { transformBroadcast, getGameName } from "@/lib/broadcasts";
import { Broadcast } from "@/lib/db/types";

export const revalidate = 3600; // Revalidate every hour (ISR)

async function getBroadcasts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
    const res = await fetch(`${baseUrl}/api/broadcasts`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error('Failed to fetch broadcasts');
      return [];
    }

    const data = await res.json();
    return data.broadcasts as Broadcast[];
  } catch (error) {
    console.error('Error fetching broadcasts:', error);
    return [];
  }
}

export default async function BroadcastsPage() {
  const broadcasts = await getBroadcasts();
  const displayBroadcasts = broadcasts.map(transformBroadcast);

  return (
    <div className="min-h-screen grid-pattern pb-7">
      <div className="scanlines">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Broadcast History</h1>
              <p className="text-muted-foreground">
                Event video production work - technical directing, replays,
                engineering, observing, and graphics.
              </p>
              <p className="text-sm text-muted-foreground">
                If you'd prefer to view this as a spreadsheet,{' '}
                <a
                  href="https://docs.google.com/spreadsheets/d/1lyz0_b6yGx4Cmhkx4hasGUAjE3256J6EJ-oPQ1O0K6A/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  click here <ExternalLink className="w-3 h-3 inline-block" />
                </a>.
              </p>
            </div>

            <div className="space-y-4">
              {displayBroadcasts.map((broadcast) => (
                <Card key={broadcast.id} className="border-border bg-card">
                  <CardContent>
                    {/* Organizer Logo - full width on mobile, left side on desktop */}
                    {broadcast.logoUrl && (
                      <div className="mb-2 md:hidden flex md:justify-center">
                        <div className="w-16 h-16 md:w-24 md:h-24 relative">
                          <Image
                            src={broadcast.logoUrl}
                            alt={`${broadcast.event_name} organizer`}
                            fill
                            className="object-contain rounded-md"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-start md:gap-4">
                      {/* Logo on desktop only */}
                      {broadcast.logoUrl && (
                        <div className="hidden md:block flex-shrink-0 w-24 h-24 relative rounded-md">
                          <Image
                            src={broadcast.logoUrl}
                            alt={`${broadcast.event_name} organizer`}
                            fill
                            className="object-contain rounded-md"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title + Date (responsive layout) */}
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                          <CardTitle className="text-lg">
                            {broadcast.event_name}
                          </CardTitle>
                          <time className="text-xs text-muted-foreground shrink-0 md:ml-auto">
                            {broadcast.dateDisplay}
                          </time>
                        </div>

                        {/* Details */}
                        {broadcast.details && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {broadcast.details}
                          </p>
                        )}

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-sm flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">ORGANIZER:</span>
                            <span className="text-foreground">
                              {broadcast.organizer}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">ROLE:</span>
                            <span className="text-foreground">
                              {broadcast.role}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">GAME:</span>
                            <span className="text-foreground">
                              {broadcast.game}
                            </span>
                          </div>
                          
                        </div>

                        {/* VOD Link */}
                        {broadcast.vod_url && (
                          <a
                            href={broadcast.vod_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-accent hover:underline inline-flex items-center gap-1 mt-2"
                          >
                            Watch VOD
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {displayBroadcasts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No broadcasts yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
