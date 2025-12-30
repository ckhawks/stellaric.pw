"use client";

import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/context/chat-context";
import {
  Activity,
  Clock,
  HardDrive,
  ImageIcon,
  Music,
  MousePointer,
  Keyboard,
  Thermometer,
  Wifi,
  Server,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Mock data for charts
const generateMockData = (points: number, min: number, max: number) => {
  return Array.from({ length: points }, (_, i) => ({
    time: i,
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

export function MetricsGrid() {
  const { isConnected, sendClick, onClickUpdate, offClickUpdate } = useChatContext();
  const [secondsAlive, setSecondsAlive] = useState(0);
  const [mouseClicks, setMouseClicks] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const [clickCount, setClickCount] = useState(0n);
  const [isClickLoading, setIsClickLoading] = useState(false);
  const [clickError, setClickError] = useState<string | null>(null);
  const [clickCooldown, setClickCooldown] = useState(0); // Cooldown timer in seconds
  const [cpuData] = useState(generateMockData(20, 20, 80));
  const [tempData] = useState(generateMockData(24, 18, 24));
  const cooldownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch initial click count
  useEffect(() => {
    const fetchClickCount = async () => {
      try {
        const response = await fetch("/api/clicks");
        const data = await response.json();
        setClickCount(BigInt(data.total_clicks));
      } catch (error) {
        console.error("Error fetching click count:", error);
        setClickError("Failed to load click count");
      }
    };

    fetchClickCount();
  }, []);

  // Setup click update listener
  useEffect(() => {
    if (!onClickUpdate || !offClickUpdate) return;

    const handleClickUpdate = (data: any) => {
      if (data.error) {
        setClickError(data.error);
      } else {
        setClickCount(BigInt(data.total_clicks));
        setClickError(null);
      }
    };

    onClickUpdate(handleClickUpdate);

    return () => {
      offClickUpdate(handleClickUpdate);
    };
  }, [onClickUpdate, offClickUpdate]);

  // Calculate seconds alive and track events
  useEffect(() => {
    // Calculate seconds alive (example birthdate)
    const birthDate = new Date("2000-03-20").getTime();
    const updateSecondsAlive = () => {
      const now = Date.now();
      setSecondsAlive(Math.floor((now - birthDate) / 1000));
    };
    updateSecondsAlive();
    const interval = setInterval(updateSecondsAlive, 1000);

    // Track mouse clicks
    const handleClick = () => setMouseClicks((prev) => prev + 1);
    window.addEventListener("click", handleClick);

    // Track keystrokes
    const handleKeydown = () => setKeystrokes((prev) => prev + 1);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  // Cleanup cooldown interval on unmount
  useEffect(() => {
    return () => {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
    };
  }, []);

  const startCooldown = () => {
    setClickCooldown(2); // 2 second cooldown
    if (cooldownIntervalRef.current) {
      clearInterval(cooldownIntervalRef.current);
    }
    cooldownIntervalRef.current = setInterval(() => {
      setClickCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownIntervalRef.current) {
            clearInterval(cooldownIntervalRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClickButtonClick = async () => {
    if (!isConnected) {
      setClickError("WebSocket not connected");
      return;
    }

    if (clickCooldown > 0) {
      return; // Ignore clicks during cooldown
    }

    setIsClickLoading(true);
    startCooldown();
    try {
      sendClick();
      // Keep loading state briefly to show error if rate limited
      setTimeout(() => {
        setIsClickLoading(false);
      }, 100);
    } catch (error) {
      console.error("Error sending click:", error);
      setClickError("Failed to send click");
      setIsClickLoading(false);
    }
  };

  const metrics = [
    {
      title: "SECONDS_ALIVE",
      value: secondsAlive.toLocaleString(),
      icon: Clock,
      description: "Time elapsed since birth",
    },
    {
      title: "COMPUTER_HOURS",
      value: "12,847",
      icon: Activity,
      description: "Total hours logged this year",
      chart: cpuData,
    },
    {
      title: "MOUSE_CLICKS",
      value: mouseClicks.toLocaleString(),
      icon: MousePointer,
      description: "Clicks tracked this session",
    },
    {
      title: "KEYSTROKES",
      value: keystrokes.toLocaleString(),
      icon: Keyboard,
      description: "Keys pressed this session",
    },
    {
      title: "PHOTO_LIBRARY",
      value: "23,491",
      icon: ImageIcon,
      description: "Images stored on NAS",
    },
    {
      title: "MUSIC_HOURS",
      value: "2,847",
      icon: Music,
      description: "Hours listened (Last.fm)",
    },
    {
      title: "INTERNET_SPEED",
      value: "847 Mbps",
      icon: Wifi,
      description: "Current download speed",
    },
    {
      title: "SERVER_UPTIME",
      value: "47d 13h 22m",
      icon: Server,
      description: "Homelab server status",
    },
    {
      title: "APARTMENT_TEMP",
      value: "21.5°C",
      icon: Thermometer,
      description: "Current temperature",
      chart: tempData,
    },
    {
      title: "DISK_USAGE",
      value: "4.2 / 8.0 TB",
      icon: HardDrive,
      description: "NAS storage capacity",
    },
    {
      title: "TOTAL_CLICKS",
      value: clickCount.toString(),
      icon: Zap,
      description: "Cumulative clicks from all users",
      isClickable: true,
      isLoading: isClickLoading,
      error: clickError,
      cooldown: clickCooldown,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card
            key={metric.title}
            className="p-6 border-border bg-card hover:border-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-1">
                  {metric.title}
                </div>
                <div className="font-mono text-2xl font-bold text-foreground">
                  {metric.value}
                </div>
              </div>
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <div className="text-xs text-muted-foreground mb-4">
              {metric.description}
            </div>
            {metric.error && (
              <div className="text-xs text-red-500 mb-4">
                {metric.error}
              </div>
            )}
            {metric.chart && (
              <div className="h-16 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric.chart}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={["dataMin", "dataMax"]} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            {metric.isClickable && (
              <Button
                onClick={handleClickButtonClick}
                disabled={metric.isLoading || metric.cooldown > 0}
                className="w-full mt-4"
                variant="outline"
              >
                {metric.cooldown > 0
                  ? `Wait ${metric.cooldown}s`
                  : metric.isLoading
                    ? "Clicking..."
                    : "Click!"}
              </Button>
            )}
          </Card>
        );
      })}
    </div>
  );
}
