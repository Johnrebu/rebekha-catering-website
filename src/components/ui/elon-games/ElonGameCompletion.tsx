import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trophy, RotateCcw, LayoutGrid } from "lucide-react";
import { useElonGameAudio } from "./ElonGameAudioContext";

interface ElonGameCompletionProps {
  isOpen: boolean;
  gameTitle: string;
  stars: number; // 1, 2, or 3
  score?: number;
  bestScore?: number;
  message?: string;
  onPlayAgain: () => void;
  onExit: () => void;
}

export const ElonGameCompletion: React.FC<ElonGameCompletionProps> = ({
  isOpen,
  gameTitle,
  stars,
  score,
  bestScore,
  message = "You did a fantastic job!",
  onPlayAgain,
  onExit,
}) => {
  const { playSound } = useElonGameAudio();

  useEffect(() => {
    if (isOpen) {
      playSound("celebration");
    }
  }, [isOpen, playSound]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-900 to-black border border-white/20 p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(16,185,129,0.2)] flex flex-col items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="completion-title"
        >
          {/* Trophy Header */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-300 flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(234,179,8,0.4)] animate-bounce">
            <Trophy className="w-8 h-8 text-zinc-950" />
          </div>

          <h3 id="completion-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
            AMAZING, ELON!
          </h3>

          <p className="text-emerald-300 text-sm font-semibold mb-3">
            Completed {gameTitle}!
          </p>

          {/* Star Rating Animation */}
          <div className="flex items-center justify-center gap-2 my-2 py-2 px-4 rounded-2xl bg-white/5 border border-white/10" aria-label={`${stars} out of 3 stars earned`}>
            {[1, 2, 3].map((starIdx) => (
              <motion.div
                key={starIdx}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 + starIdx * 0.15, type: "spring", stiffness: 400 }}
              >
                <Star
                  className={`w-9 h-9 ${
                    starIdx <= stars
                      ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]"
                      : "text-white/20 fill-transparent"
                  }`}
                  aria-hidden="true"
                />
              </motion.div>
            ))}
            <span className="sr-only">{stars} out of 3 stars earned</span>
          </div>

          {/* Scores Display */}
          <div className="w-full flex justify-around my-4 py-2.5 px-4 rounded-2xl bg-black/40 border border-white/10 text-sm">
            {score !== undefined && (
              <div>
                <span className="text-white/50 text-xs block">Score</span>
                <span className="text-lg font-black text-yellow-400">{score}</span>
              </div>
            )}
            {bestScore !== undefined && (
              <div>
                <span className="text-white/50 text-xs block">Best Score</span>
                <span className="text-lg font-black text-emerald-400">{bestScore}</span>
              </div>
            )}
          </div>

          <p className="text-white/70 text-xs sm:text-sm mb-6 max-w-xs">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-3">
            <button
              onClick={() => {
                playSound("click");
                onPlayAgain();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-sm tracking-wide uppercase shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>

            <button
              onClick={() => {
                playSound("click");
                onExit();
              }}
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white/90 font-semibold text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <LayoutGrid className="w-4 h-4 text-emerald-400" />
              More Games
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
