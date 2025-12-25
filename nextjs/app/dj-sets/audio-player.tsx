"use client";

import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  audioFile: string;
  setId: string;
  isPlaying: boolean;
  onPlayingChange: (setId: string | null) => void;
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  setAudioRef?: (ref: HTMLAudioElement | null) => void;
}

export function AudioPlayer({
  audioFile,
  setId,
  isPlaying,
  onPlayingChange,
  currentTime,
  onTimeUpdate,
  setAudioRef,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = `https://s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_S3_BUCKET}/${audioFile}`;

  // Register audio ref with parent
  useEffect(() => {
    if (setAudioRef) {
      setAudioRef(audioRef.current);
      return () => setAudioRef(null);
    }
  }, [setAudioRef]);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDraggingSeekbar, setIsDraggingSeekbar] = useState(false);

  // Handle audio metadata
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      if (!isDraggingSeekbar) {
        onTimeUpdate(audio.currentTime);
      }
    };

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      onPlayingChange(null);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isDraggingSeekbar, onTimeUpdate, onPlayingChange]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handlePlayToggle = () => {
    if (!isPlaying) {
      onPlayingChange(setId);
    } else {
      onPlayingChange(null);
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      onTimeUpdate(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return "0:00";

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

  return (
    <div className="w-full space-y-4 p-4 rounded-lg border border-border bg-secondary/30">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        crossOrigin="anonymous"
      />

      {/* Controls Row */}
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayToggle}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-accent/10 transition-colors text-foreground"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        {/* Time Display */}
        <div className="text-xs text-muted-foreground font-mono flex-shrink-0">
          {formatTime(currentTime)}
        </div>

        {/* Seek Bar */}
        <div className="flex-1">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 0}
            step={0.1}
            onValueChange={handleSeek}
            onPointerDown={() => setIsDraggingSeekbar(true)}
            onPointerUp={() => setIsDraggingSeekbar(false)}
            className="w-full"
          />
        </div>

        {/* Duration Display */}
        <div className="text-xs text-muted-foreground font-mono flex-shrink-0">
          {formatTime(duration)}
        </div>
      </div>

      {/* Volume Control Row */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleMuteToggle}
          className="flex-shrink-0 p-2 hover:bg-accent/10 rounded transition-colors text-foreground"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        <div className="w-24">
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-full"
          />
        </div>

        <span className="text-xs text-muted-foreground font-mono w-8">
          {Math.round((isMuted ? 0 : volume) * 100)}%
        </span>
      </div>
    </div>
  );
}
