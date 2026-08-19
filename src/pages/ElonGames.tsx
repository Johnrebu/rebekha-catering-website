import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gamepad2, Sparkles, X } from "lucide-react";
import BalloonBackground from "@/components/ui/balloon-background-demo";
import MemoryCardsGame from "@/components/ui/memory-cards-game";
import ABCPopGame from "@/components/ui/abc-pop-game";
import ColorMatchGame from "@/components/ui/color-match-game";
import CountStarsGame from "@/components/ui/count-stars-game";
import ShapeSorterGame from "@/components/ui/shape-sorter-game";
import FeedCaterpillarGame from "@/components/ui/feed-caterpillar-game";
import TraceDrawGame from "@/components/ui/trace-draw-game";
import CatchFishGame from "@/components/ui/catch-fish-game";
import PatternTrainGame from "@/components/ui/pattern-train-game";
import MusicMakerGame from "@/components/ui/music-maker-game";
import PaintSplashGame from "@/components/ui/paint-splash-game";

/* ─────────── game registry ─────────── */

interface GameEntry {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  borderGlow: string;
  tags: string[];
  category: "learning" | "motor" | "creative";
}

const GAMES: GameEntry[] = [
  {
    id: "balloon-pop",
    title: "Balloon Pop",
    description: "Pop colorful balloons as they float up! Watch them burst into sparkly particles.",
    emoji: "🎈",
    gradient: "from-rose-500/20 via-pink-500/10 to-purple-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(255,46,99,0.3)]",
    tags: ["Casual", "Fun"],
    category: "creative",
  },
  {
    id: "memory-cards",
    title: "Memory Cards",
    description: "Flip cards to find matching pairs! Train your memory with animals, fruits and stars.",
    emoji: "🃏",
    gradient: "from-indigo-500/20 via-purple-500/10 to-violet-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]",
    tags: ["Memory", "Brain"],
    category: "learning",
  },
  {
    id: "abc-pop",
    title: "ABC Pop",
    description: "Pop the letter balloons to learn the alphabet! Find the correct letter each round.",
    emoji: "🔤",
    gradient: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]",
    tags: ["Letters", "Phonics"],
    category: "learning",
  },
  {
    id: "color-match",
    title: "Color Match",
    description: "Find all things of the right color before time runs out! Learn your colors fast.",
    emoji: "🎨",
    gradient: "from-amber-500/20 via-orange-500/10 to-red-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]",
    tags: ["Colors", "Speed"],
    category: "learning",
  },
  {
    id: "count-stars",
    title: "Count the Stars",
    description: "Count twinkling stars in the night sky and pick the right number!",
    emoji: "🔢",
    gradient: "from-blue-500/20 via-indigo-500/10 to-slate-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    tags: ["Counting", "Numbers"],
    category: "learning",
  },
  {
    id: "shape-sorter",
    title: "Shape Sorter",
    description: "Drag circles, squares, triangles and more into their matching holes!",
    emoji: "🔷",
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]",
    tags: ["Shapes", "Drag & Drop"],
    category: "motor",
  },
  {
    id: "feed-caterpillar",
    title: "Feed the Caterpillar",
    description: "Drag healthy food to grow the caterpillar! Avoid junk food. Become a butterfly!",
    emoji: "🐛",
    gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    tags: ["Health", "Drag & Drop"],
    category: "motor",
  },
  {
    id: "trace-draw",
    title: "Trace & Draw",
    description: "Trace dotted letters and numbers with your finger to practice writing!",
    emoji: "✏️",
    gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
    tags: ["Writing", "Fine Motor"],
    category: "motor",
  },
  {
    id: "catch-fish",
    title: "Catch the Fish",
    description: "Tap swimming fish in the underwater world! Meet dolphins and whales along the way.",
    emoji: "🎣",
    gradient: "from-cyan-500/20 via-sky-500/10 to-blue-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
    tags: ["Tap", "Coordination"],
    category: "motor",
  },
  {
    id: "pattern-train",
    title: "Pattern Train",
    description: "Figure out the color pattern and pick what comes next! The train chugs along!",
    emoji: "🚂",
    gradient: "from-teal-500/20 via-cyan-500/10 to-sky-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]",
    tags: ["Patterns", "Logic"],
    category: "learning",
  },
  {
    id: "music-maker",
    title: "Music Maker",
    description: "Tap colorful pads to play music, animal sounds, and drums! Record your songs.",
    emoji: "🥁",
    gradient: "from-fuchsia-500/20 via-pink-500/10 to-rose-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]",
    tags: ["Music", "Creative"],
    category: "creative",
  },
  {
    id: "paint-splash",
    title: "Paint Splash",
    description: "Tap to splash colorful paint, drag to draw! Pick colors and brush sizes.",
    emoji: "🌈",
    gradient: "from-rose-500/20 via-red-500/10 to-orange-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]",
    tags: ["Art", "Creative"],
    category: "creative",
  },
];

const CATEGORIES = [
  { id: "all", label: "🎮 All Games" },
  { id: "learning", label: "🧠 Learning" },
  { id: "motor", label: "🎯 Motor Skills" },
  { id: "creative", label: "🎨 Creative" },
];

/* ─────────── game components map ─────────── */

const GAME_COMPONENTS: Record<string, React.ComponentType> = {
  "balloon-pop": BalloonBackground,
  "memory-cards": MemoryCardsGame,
  "abc-pop": ABCPopGame,
  "color-match": ColorMatchGame,
  "count-stars": CountStarsGame,
  "shape-sorter": ShapeSorterGame,
  "feed-caterpillar": FeedCaterpillarGame,
  "trace-draw": TraceDrawGame,
  "catch-fish": CatchFishGame,
  "pattern-train": PatternTrainGame,
  "music-maker": MusicMakerGame,
  "paint-splash": PaintSplashGame,
};

/* ─────────── game card ─────────── */

function GameCard({ game, onPlay }: { game: GameEntry; onPlay: (id: string) => void }) {
  const categoryBadge = {
    learning: { label: "🧠 Learning", color: "bg-blue-500/20 text-blue-300" },
    motor: { label: "🎯 Motor Skills", color: "bg-orange-500/20 text-orange-300" },
    creative: { label: "🎨 Creative", color: "bg-pink-500/20 text-pink-300" },
  };
  const badge = categoryBadge[game.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${game.gradient} backdrop-blur-sm ${game.borderGlow} transition-all duration-500 hover:border-white/25`}
    >
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-all duration-700" />

      <div className="relative p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
            {game.emoji}
          </span>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {game.title}
            </h3>
            <div className="flex gap-1.5 mt-1">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${badge.color}`}>
                {badge.label}
              </span>
            </div>
          </div>
        </div>

        <p className="text-white/50 text-xs leading-relaxed mb-4">
          {game.description}
        </p>

        <div className="flex gap-1.5 mb-4">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-white/10 text-white/40 text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => onPlay(game.id)}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm tracking-wide uppercase hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            Play Now
          </span>
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────── main page ─────────── */

export default function ElonGames() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handlePlay = useCallback((gameId: string) => {
    setActiveGame(gameId);
  }, []);

  const handleBack = useCallback(() => {
    setActiveGame(null);
  }, []);

  const filteredGames =
    categoryFilter === "all"
      ? GAMES
      : GAMES.filter((g) => g.category === categoryFilter);

  /* ── If a game is active, render it full-screen ── */
  if (activeGame) {
    const GameComponent = GAME_COMPONENTS[activeGame];
    if (!GameComponent) {
      setActiveGame(null);
      return null;
    }

    return (
      <AnimatePresence>
        <motion.div
          key="game"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40"
        >
          <GameComponent />
          {/* Exit button overlay */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleBack}
            className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-black/60 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <X className="w-4 h-4" />
            Exit Game
          </motion.button>
        </motion.div>
      </AnimatePresence>
    );
  }

  /* ── Games hub ── */
  return (
    <div className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/40 via-zinc-950 to-black text-white overflow-x-hidden">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{ y: [null, -20, 20], opacity: [0.1, 0.4, 0.1] }}
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
      <section className="relative z-10 pt-4 pb-8">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-yellow-400/80">
                Welcome to
              </span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-3">
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Elon Games
              </span>
            </h1>

            <p className="text-base text-white/40 max-w-md mx-auto mb-6">
              {GAMES.length} fun games to play! Pick one and start! 🎮
            </p>

            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    categoryFilter === cat.id
                      ? "bg-white/15 text-white border border-white/25"
                      : "bg-white/5 text-white/40 border border-transparent hover:bg-white/10 hover:text-white/60"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="relative z-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {filteredGames.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GameCard game={game} onPlay={handlePlay} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/20 text-xs">
            Made with ❤️ for Elon • Elon Games • {GAMES.length} games
          </p>
        </div>
      </footer>
    </div>
  );
}
