"use client";

import { useState, useRef, useCallback } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Music, MapPin, Calendar, Clock } from "lucide-react";
import djSetsData from "@/data/dj-sets.json";
import { AudioPlayer } from "./audio-player";
import { TrackList } from "./track-list";

interface DJSet {
  id: string;
  title: string;
  date: string;
  venue: string;
  duration: string;
  audioFile?: string;
  ytVideoId?: string | null;
  description: string;
  highlights?: string[];
  tracklist?: Array<{
    artist: string;
    title: string;
    timestamp: string;
  }>;
}

export default function DJSetsPage() {
  const [expandedSetId, setExpandedSetId] = useState<string | null>(null);
  const [currentlyPlayingSetId, setCurrentlyPlayingSetId] = useState<
    string | null
  >(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const sets = djSetsData.djSets as DJSet[];

  const handleSeekToTime = useCallback((setId: string, time: number) => {
    const audio = audioRefs.current[setId];
    if (audio) {
      audio.currentTime = time;
      audio.play();
      setCurrentlyPlayingSetId(setId);
    }
  }, []);

  const handleSetExpand = (setId: string) => {
    setExpandedSetId(expandedSetId === setId ? null : setId);
  };

  const handlePlayingSetChange = (setId: string | null) => {
    setCurrentlyPlayingSetId(setId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col grid-pattern pb-7">
      <Header />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 pt-20">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            {/* <Music className="w-8 h-8 text-accent" /> */}
            <h1 className="text-4xl md:text-4xl font-bold">DJ Sets</h1>
          </div>
          <p className="text-muted-foreground">
            A collection of my recorded DJ sets with track listings and
            timestamps.
          </p>
        </div>

        {/* Sets Grid */}
        <div className="grid gap-6">
          {sets.map((set) => (
            <Card
              key={set.id}
              className="border-border bg-card hover:border-accent/50 transition-all overflow-hidden"
            >
              <CardHeader
                className="cursor-pointer transition-colors"
                onClick={() => handleSetExpand(set.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-3 flex items-center gap-2">
                      {/* <Music className="w-5 h-5 text-accent" /> */}
                      {set.title}
                    </CardTitle>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-sm flex-wrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {formatDate(set.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {set.venue}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {set.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      expandedSetId === set.id ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </CardHeader>

              {/* Expanded Content */}
              {expandedSetId === set.id && (
                <CardContent className="pt-0 border-t border-border">
                  <div className="space-y-6 pt-6">
                    {/* Description */}
                    <div>
                      <h3 className="font-semibold mb-2 text-foreground">
                        About This Set
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {set.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    {/* {set.highlights.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2 text-foreground">
                          Key Moments
                        </h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {set.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-accent flex-shrink-0">
                                •
                              </span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )} */}

                    {/* Media Player */}
                    <div>
                      <h3 className="font-semibold mb-3 text-foreground">
                        {set.ytVideoId ? "Watch" : "Listen"}
                      </h3>
                      {set.ytVideoId ? (
                        <div className="aspect-video rounded-lg overflow-hidden border border-border">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${set.ytVideoId}`}
                            title={set.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                      ) : set.audioFile ? (
                        <AudioPlayer
                          audioFile={set.audioFile}
                          setId={set.id}
                          isPlaying={currentlyPlayingSetId === set.id}
                          onPlayingChange={handlePlayingSetChange}
                          currentTime={currentTime}
                          onTimeUpdate={setCurrentTime}
                          setAudioRef={(ref) => {
                            audioRefs.current[set.id] = ref;
                          }}
                        />
                      ) : (
                        <div className="p-4 rounded-lg border border-border bg-secondary/30 text-muted-foreground">
                          Recording not available
                        </div>
                      )}
                    </div>

                    {/* Track List */}
                    {set.tracklist && set.tracklist.length > 0 ? (
                      <div>
                        <h3 className="font-semibold mb-3 text-foreground">
                          Tracklist
                        </h3>
                        <TrackList
                          tracks={set.tracklist}
                          currentTime={currentTime}
                          onSeek={(timestamp) =>
                            handleSeekToTime(set.id, timestamp)
                          }
                        />
                      </div>
                    ) : (
                      <div className="p-4 rounded-lg border border-border bg-secondary/30 text-muted-foreground">
                        Tracklist unavailable
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {sets.length === 0 && (
          <div className="text-center py-12">
            <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">
              No DJ sets yet. Check back soon!
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
