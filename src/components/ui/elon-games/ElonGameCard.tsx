import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Gamepad2, Trophy, Star, Sparkles } from "lucide-react";
import { GameRecord } from "./ElonGameProgress";
import { useElonGameAudio } from "./ElonGameAudioContext";

export interface GameEntry {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  borderGlow: string;
  tags: string[];
  category: "learning" | "motor" | "creative";
}

interface ElonGameCardProps {
  game: GameEntry;
  record: GameRecord | null;
  onPlay: (id: string) => void;
}

export const ElonGameCard: React.FC<ElonGameCardProps> = ({ game, record, onPlay }) => {
  const shouldReduceMotion = useReducedMotion();
  const { playSound } = useElonGameAudio();

  const isCompleted = record?.completed ?? false;
  const stars = record?.stars ?? 0;
  const bestScore = record?.bestScore;

  const categoryBadge = {
    learning: { label: "🧠 Learning", color: "bg-blue-500/20 text-blue-300 border-blue-400/30" },
    motor: { label: "🎯 Motor Skills", color: "bg-purple-500/20 text-purple-300 border-purple-400/30" },
    creative: { label: "🎨 Creative", color: "bg-pink-500/20 text-pink-300 border-pink-400/30" },
  };
  const badge = categoryBadge[game.category];

  const handlePlayClick = () => {
    playSound("click");
    onPlay(game.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${game.gradient} backdrop-blur-md ${game.borderGlow} transition-all duration-300 hover:border-white/30 flex flex-col justify-between h-full shadow-lg`}
    >
      {/* Background glow orb */}
      <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-all duration-500 pointer-events-none" />

      {/* Main Content */}
      <div className="relative p-5 sm:p-6 flex-1 flex flex-col">
        {/* Top Header: Emoji + Title + Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span
              className="text-4xl sm:text-5xl drop-shadow-md select-none transform transition-transform duration-300 group-hover:scale-110"
              role="img"
              aria-label={game.title}
            >
              {game.emoji}
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                {game.title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badge.color}`}>
                  {badge.label}
                </span>
              </div>
            </div>
          </div>

          {/* Completion status badge */}
          {isCompleted ? (
            <span
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]"
              title="Game completed"
              aria-label="Completed"
            >
              <Trophy className="w-3 h-3 text-emerald-400" />
              Completed
            </span>
          ) : (
            <span
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[11px] font-medium"
              title="Not yet completed"
            >
              <Gamepad2 className="w-3 h-3" />
              Play
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
          {game.description}
        </p>

        {/* Stars Display & Best Score */}
        <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-black/20 border border-white/5 mb-4">
          <div className="flex items-center gap-1" aria-label={`${stars} out of 3 stars earned`}>
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className={`w-4 h-4 ${
                  starIdx <= stars
                    ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
                    : "text-white/20 fill-transparent"
                }`}
                aria-hidden="true"
              />
            ))}
            <span className="sr-only">{stars} out of 3 stars earned</span>
            <span className="text-[11px] text-white/50 font-medium ml-1">
              {stars > 0 ? `${stars}/3 Stars` : "0/3 Stars"}
            </span>
          </div>

          {bestScore !== undefined && bestScore > 0 && (
            <div className="text-[11px] text-emerald-300/80 font-medium">
              Best: <span className="font-bold text-white">{bestScore}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Play Action Button */}
        <button
          onClick={handlePlayClick}
          className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md ${
            isCompleted
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              : "bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-teal-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          }`}
          aria-label={`${isCompleted ? "Play again" : "Play now"} ${game.title}`}
        >
          <span className="flex items-center justify-center gap-2">
            {isCompleted ? (
              <>
                <Sparkles className="w-4 h-4" />
                Play Again
              </>
            ) : (
              <>
                <Gamepad2 className="w-4 h-4" />
                Play Now
              </>
            )}
          </span>
        </button>
      </div>
    </motion.div>
  );
};
