"use client";

interface Track {
  artist: string;
  title: string;
  timestamp: string;
}

interface TrackListProps {
  tracks: Track[];
  currentTime: number;
  onSeek: (timestamp: number) => void;
}

export function TrackList({ tracks, currentTime, onSeek }: TrackListProps) {
  // Convert HH:MM:SS format to seconds
  const timeStringToSeconds = (timeStr: string): number => {
    const parts = timeStr.split(":").map(Number);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 0;
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  // Determine which track is currently playing based on currentTime
  const getCurrentTrackIndex = (): number => {
    for (let i = tracks.length - 1; i >= 0; i--) {
      const trackSeconds = timeStringToSeconds(tracks[i].timestamp);
      if (currentTime >= trackSeconds) {
        return i;
      }
    }
    return -1;
  };

  const currentTrackIndex = getCurrentTrackIndex();

  const handleTimestampClick = (timestampStr: string) => {
    const seconds = timeStringToSeconds(timestampStr);
    onSeek(seconds);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-3 font-semibold text-muted-foreground">
              #
            </th>
            <th className="text-left py-3 px-3 font-semibold text-muted-foreground">
              Artist
            </th>
            <th className="text-left py-3 px-3 font-semibold text-muted-foreground">
              Track
            </th>
            <th className="text-left py-3 px-3 font-semibold text-muted-foreground">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => {
            const isCurrentTrack = index === currentTrackIndex;
            return (
              <tr
                key={index}
                className={`border-b border-border transition-colors ${
                  isCurrentTrack
                    ? "bg-accent/10 hover:bg-accent/20"
                    : "hover:bg-secondary/50"
                }`}
              >
                <td className="py-3 px-3 text-muted-foreground font-mono w-8">
                  {index + 1}
                </td>
                <td className="py-3 px-3 text-foreground">{track.artist}</td>
                <td className="py-3 px-3 text-foreground">
                  <span
                    className={`${
                      isCurrentTrack ? "font-semibold text-accent" : ""
                    } ${
                      track.title === "Miscellaneous Tracks"
                        ? "italic text-muted-foreground"
                        : ""
                    }`}
                  >
                    {track.title}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <button
                    onClick={() => handleTimestampClick(track.timestamp)}
                    className="font-mono text-xs text-muted-foreground hover:text-foreground hover:underline font-semibold transition-colors"
                    title="Click to jump to this track"
                  >
                    {track.timestamp}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
