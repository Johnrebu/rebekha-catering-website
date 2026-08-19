import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2, Volume2, VolumeX, Star, Trophy } from "lucide-react";
import { useElonGameAudio } from "./ElonGameAudioContext";

interface ElonGameHeaderProps {
  totalStars: number;
  completedCount: number;
}

export const ElonGameHeader: React.FC<ElonGameHeaderProps> = ({
  totalStars,
  completedCount,
}) => {
  const { soundEnabled, toggleSound } = useElonGameAudio();

  return (
    <header className="relative z-20 w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back Link & Player */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            aria-label="Back to Rebekha Caterers main site"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Site</span>
          </Link>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
            <Gamepad2 className="w-4 h-4 text-emerald-400" />
            <span className="text-white/70">
              Player: <span className="text-emerald-400 font-bold">Elon</span>
            </span>
          </div>
        </div>

        {/* Right: Stars, Completed & Sound Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Total Stars Badge */}
          <div
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border border-yellow-500/30 text-yellow-300 text-sm font-bold shadow-[0_0_15px_rgba(234,179,8,0.15)]"
            title={`${totalStars} total stars earned`}
            aria-label={`Total stars: ${totalStars}`}
          >
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />
            <span>{totalStars} Stars</span>
          </div>

          {/* Completed Games Count */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium"
            title={`${completedCount} games completed`}
            aria-label={`${completedCount} games completed`}
          >
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span>{completedCount} Completed</span>
          </div>

          {/* Accessible Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
              soundEnabled
                ? "bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-400/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                : "bg-white/5 hover:bg-white/10 border-white/15 text-white/50"
            }`}
            aria-label={soundEnabled ? "Mute all Elon Games audio" : "Enable sound for Elon Games"}
            aria-pressed={soundEnabled}
            title={soundEnabled ? "Sound ON (Click to Mute)" : "Sound OFF (Click to Enable)"}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-white/40" />
                <span className="hidden sm:inline">Sound OFF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
