import React, { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Maximize, Minimize, Volume2, VolumeX } from "lucide-react";
import { useElonGameAudio } from "./ElonGameAudioContext";

interface ElonGameControlsProps {
  onBack: () => void;
  gameTitle?: string;
}

export const ElonGameControls: React.FC<ElonGameControlsProps> = ({ onBack, gameTitle }) => {
  const { soundEnabled, toggleSound, playSound } = useElonGameAudio();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    playSound("click");
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen not supported or blocked
    }
  }, [playSound]);

  const handleBack = useCallback(() => {
    playSound("click");
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    onBack();
  }, [onBack, playSound]);

  return (
    <div className="fixed top-3 left-3 right-3 z-50 flex items-center justify-between pointer-events-none select-none">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/70 hover:bg-black/90 active:scale-95 backdrop-blur-xl border border-white/25 text-white text-sm font-bold shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        aria-label="Back to Elon Games list"
      >
        <ArrowLeft className="w-4 h-4 text-emerald-400" />
        <span className="hidden xs:inline">Back to Games</span>
      </button>

      {/* Game Title Badge (Center) */}
      {gameTitle && (
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-white/90 text-sm font-semibold shadow-xl">
          <span>{gameTitle}</span>
        </div>
      )}

      {/* Right Controls: Fullscreen + Sound */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2.5 rounded-2xl border backdrop-blur-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-xl active:scale-95 ${
            soundEnabled
              ? "bg-cyan-950/80 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              : "bg-black/70 border-white/20 text-white/50"
          }`}
          aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
          title={soundEnabled ? "Sound ON" : "Sound OFF"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-white/40" />}
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="p-2.5 rounded-2xl bg-black/70 hover:bg-black/90 active:scale-95 backdrop-blur-xl border border-white/25 text-white shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen mode"}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
        >
          {isFullscreen ? <Minimize className="w-4 h-4 text-yellow-400" /> : <Maximize className="w-4 h-4 text-emerald-400" />}
        </button>
      </div>
    </div>
  );
};
