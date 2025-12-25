"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
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
  const [secondsAlive, setSecondsAlive] = useState(0);
  const [mouseClicks, setMouseClicks] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const [cpuData] = useState(generateMockData(20, 20, 80));
  const [tempData] = useState(generateMockData(24, 18, 24));

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
          </Card>
        );
      })}
    </div>
  );
}
