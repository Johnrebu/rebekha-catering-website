import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gamepad2, Trophy, Sparkles, X } from "lucide-react";
import BalloonBackground from "@/components/ui/balloon-background-demo";

/* ─────────── game registry (add more games here later) ─────────── */

interface GameEntry {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  borderGlow: string;
  tags: string[];
}

const GAMES: GameEntry[] = [
  {
    id: "balloon-pop",
    title: "Balloon Pop",
    description:
      "Move your mouse (or finger) to pop colorful balloons as they float up! Watch them burst into sparkly particles. How many can you pop?",
    emoji: "🎈",
    gradient: "from-rose-500/20 via-pink-500/10 to-purple-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(255,46,99,0.3)]",
    tags: ["Casual", "Fun", "Touch-friendly"],
  },
];

/* ─────────────────── score overlay ─────────────────── */

function ScoreOverlay({
  score,
  onBack,
}: {
  score: number;
  onBack: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onBack}
        className="pointer-events-auto absolute top-6 left-6 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <X className="w-4 h-4" />
        Exit Game
      </motion.button>

      {/* Score */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pointer-events-none absolute top-6 right-6 flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
      >
        <Trophy className="w-5 h-5 text-yellow-400" />
        <span className="text-white font-bold text-lg tabular-nums">
          {score}
        </span>
      </motion.div>

      {/* Player name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
      >
        <Gamepad2 className="w-4 h-4 text-emerald-400" />
        <span className="text-white/80 text-sm font-medium">
          Player: <span className="text-emerald-400 font-bold">Elon</span>
        </span>
      </motion.div>
    </div>
  );
}

/* ─────────────────── game card ─────────────────── */

function GameCard({
  game,
  onPlay,
}: {
  game: GameEntry;
  onPlay: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${game.gradient} backdrop-blur-sm ${game.borderGlow} transition-all duration-500 hover:border-white/25`}
    >
      {/* Glow orb */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-all duration-700" />

      <div className="relative p-8">
        {/* Emoji icon */}
        <div className="flex items-center gap-4 mb-5">
          <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
            {game.emoji}
          </span>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {game.title}
            </h3>
            <div className="flex gap-2 mt-1.5">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/60 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          {game.description}
        </p>

        {/* Play button */}
        <button
          onClick={() => onPlay(game.id)}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm tracking-wide uppercase hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-2">
            <Gamepad2 className="w-5 h-5" />
            Play Now
          </span>
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────────── main page ─────────────────── */

export default function ElonGames() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const handlePlay = useCallback((gameId: string) => {
    setScore(0);
    setActiveGame(gameId);
  }, []);

  const handleBack = useCallback(() => {
    setActiveGame(null);
  }, []);

  /* ── If a game is active, render it full-screen ── */
  if (activeGame === "balloon-pop") {
    return (
      <AnimatePresence>
        <motion.div
          key="game"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40"
          onClick={() => setScore((s) => s + 1)}
        >
          <BalloonBackground />
          <ScoreOverlay score={score} onBack={handleBack} />
        </motion.div>
      </AnimatePresence>
    );
  }

  /* ── Games hub ── */
  return (
    <div className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/40 via-zinc-950 to-black text-white overflow-x-hidden">
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            <Gamepad2 className="w-4 h-4 text-emerald-400" />
            <span className="text-white/70 text-sm">
              Player: <span className="text-emerald-400 font-bold">Elon</span>
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 pt-8 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span className="text-sm font-semibold tracking-widest uppercase text-yellow-400/80">
                Welcome to
              </span>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Elon Games
              </span>
            </h1>

            <p className="text-lg text-white/50 max-w-md mx-auto">
              Your personal game zone! Pick a game and start playing 🎮
            </p>
          </motion.div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="relative z-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {GAMES.map((game) => (
              <GameCard key={game.id} game={game} onPlay={handlePlay} />
            ))}

            {/* Coming soon placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative overflow-hidden rounded-2xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center p-8 min-h-[280px]"
            >
              <span className="text-4xl mb-3 opacity-30">🎯</span>
              <p className="text-white/30 text-sm font-medium">
                More games coming soon!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative overflow-hidden rounded-2xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center p-8 min-h-[280px]"
            >
              <span className="text-4xl mb-3 opacity-30">🏎️</span>
              <p className="text-white/30 text-sm font-medium">
                Stay tuned, Elon!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/20 text-xs">
            Made with ❤️ for Elon • Elon Games
          </p>
        </div>
      </footer>
    </div>
  );
}
