"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Database,
  Clock,
  Zap,
  Cpu,
  Music,
  Thermometer,
  Wifi,
  HardDrive,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export function GlobalStateMonitor() {
  const [time, setTime] = useState("");
  const [latency, setLatency] = useState(0);
  const [mode] = useState("CREATIVE");
  const [cpuUsage, setCpuUsage] = useState(0);
  const [spotifyData, setSpotifyData] = useState<SpotifyData>({
    isPlaying: false,
  });
  const [currentMetric, setCurrentMetric] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const rotatingMetrics = [
    {
      icon: Thermometer,
      label: "TEMP",
      value: "21.5°C",
      color: "text-orange-500",
    },
    { icon: Wifi, label: "NET", value: "847Mbps", color: "text-blue-500" },
    { icon: HardDrive, label: "DISK", value: "52%", color: "text-purple-500" },
  ];

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // Simulate latency check
    const checkLatency = async () => {
      const start = performance.now();
      try {
        await fetch("/api/ping");
        const end = performance.now();
        setLatency(Math.round(end - start));
      } catch {
        setLatency(0);
      }
    };
    checkLatency();
    const latencyInterval = setInterval(checkLatency, 5000);

    // Simulate CPU usage (would connect to real API in production)
    const updateCpuUsage = () => {
      setCpuUsage(Math.floor(Math.random() * 40) + 10);
    };
    updateCpuUsage();
    const cpuInterval = setInterval(updateCpuUsage, 3000);

    // Check for Spotify track
    const checkSpotify = async () => {
      try {
        const response = await fetch("/api/spotify/now-playing");
        const data = await response.json();
        setSpotifyData(data);
      } catch {
        // If Spotify API fails, use placeholder
        setSpotifyData({
          isPlaying: true,
          title: "Porter Robinson - Lionhearted",
          artist: "Porter Robinson",
        });
      }
    };
    checkSpotify();
    const spotifyInterval = setInterval(checkSpotify, 30000);

    // Rotate through additional metrics every 5 seconds
    const rotateInterval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % rotatingMetrics.length);
    }, 5000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(latencyInterval);
      clearInterval(cpuInterval);
      clearInterval(spotifyInterval);
      clearInterval(rotateInterval);
    };
  }, []);

  const RotatingMetric = rotatingMetrics[currentMetric];
  const RotatingIcon = RotatingMetric.icon;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background backdrop-blur-sm backdrop-brightness-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap text-xs font-mono overflow-x-auto flex-row sm:flex-row h-auto sm:h-8 sm:items-center xs:items-start sm:gap-4 gap-2 md:h-8 xs:h-auto py-2 sm:py-0 overflow-x-none">
          <div className="flex items-center gap-1.5 shrink-0">
            <Zap className="w-3 h-3 text-accent" />
            <span className="text-muted-foreground hidden sm:inline">
              PING:
            </span>
            <span className="text-foreground">{latency}ms</span>
          </div>
          {/* <div className="flex items-center gap-1.5 shrink-0">
            <Database className="w-3 h-3 text-success" />
            <span className="text-muted-foreground hidden sm:inline">DB:</span>
            <span className="text-foreground">OK</span>
          </div> */}
          {/* <div className="flex items-center gap-1.5 shrink-0">
            <Activity className="w-3 h-3 text-blue-500" />
            <span className="text-muted-foreground hidden sm:inline">MODE:</span>
            <span className="text-foreground">{mode}</span>
          </div> */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Cpu className="w-3 h-3 text-yellow-500" />
            <span className="text-muted-foreground hidden sm:inline">CPU:</span>
            <span className="text-foreground">{cpuUsage}%</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <RotatingIcon className={`w-3 h-3 ${RotatingMetric.color}`} />
            <span className="text-muted-foreground hidden sm:inline">
              {RotatingMetric.label}:
            </span>
            <span className="text-foreground">{RotatingMetric.value}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 md:ml-auto ml-0 gap-2 md:gap-4 flex-row xs:gap-2 xs:items-start flex-wrap sm:flex-nowrap overflow-x-none">
            {spotifyData.isPlaying && (
              <div className="flex items-center gap-1.5 shrink-0 max-w-[250px]">
                <Music className="w-3 h-3 text-green-500 animate-pulse" />
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <button
                      onMouseEnter={() => setPopoverOpen(true)}
                      onMouseLeave={() => setPopoverOpen(false)}
                      onClick={() => {
                        if (spotifyData.songUrl) {
                          window.open(spotifyData.songUrl, "_blank");
                        }
                      }}
                      className="text-foreground truncate hover:underline hover:cursor-pointer text-left"
                    >
                      {spotifyData.title} - {spotifyData.artist}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    side="top"
                    onMouseEnter={() => setPopoverOpen(true)}
                    onMouseLeave={() => setPopoverOpen(false)}
                  >
                    {spotifyData.albumImageUrl && (
                      <img
                        src={spotifyData.albumImageUrl}
                        alt={spotifyData.album}
                        className="rounded w-64 h-64"
                      />
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            )}
            <div className="flex items-center gap-1.5 shrink-0 md:ml-auto sm:ml-0">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="text-foreground">{time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
