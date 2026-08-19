import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ElonGameAudioProvider } from "@/components/ui/elon-games/ElonGameAudioContext";
import { useElonGameProgress } from "@/components/ui/elon-games/useElonGameProgress";
import { ElonGameHeader } from "@/components/ui/elon-games/ElonGameHeader";
import { ElonGameCard, GameEntry } from "@/components/ui/elon-games/ElonGameCard";
import { ElonGameControls } from "@/components/ui/elon-games/ElonGameControls";

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

/* ─────────── Game Registry ─────────── */

const GAMES: GameEntry[] = [
  {
    id: "balloon-pop",
    title: "Balloon Pop",
    description: "Pop colorful floating balloons! Watch them burst with vibrant sparkles & joyful sound.",
    emoji: "🎈",
    gradient: "from-rose-500/20 via-pink-500/10 to-purple-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(255,46,99,0.3)]",
    tags: ["Casual", "Fun", "Touch"],
    category: "creative",
  },
  {
    id: "memory-cards",
    title: "Memory Cards",
    description: "Flip cards to find matching pairs! Train your visual memory with cute animals & fruits.",
    emoji: "🃏",
    gradient: "from-indigo-500/20 via-purple-500/10 to-violet-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]",
    tags: ["Memory", "Brain", "Focus"],
    category: "learning",
  },
  {
    id: "abc-pop",
    title: "ABC Pop",
    description: "Pop letter balloons with spoken phonics! Master letters from A to Z with voice pronunciations.",
    emoji: "🔤",
    gradient: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]",
    tags: ["Letters", "Phonics", "Speech"],
    category: "learning",
  },
  {
    id: "color-match",
    title: "Color Match",
    description: "Find all items of the target color before the timer runs out! Fast-paced color recognition.",
    emoji: "🎨",
    gradient: "from-amber-500/20 via-orange-500/10 to-red-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]",
    tags: ["Colors", "Speed", "Matching"],
    category: "learning",
  },
  {
    id: "count-stars",
    title: "Count the Stars",
    description: "Count twinkling night sky stars and select the right number! Build early math confidence.",
    emoji: "🔢",
    gradient: "from-blue-500/20 via-indigo-500/10 to-slate-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    tags: ["Counting", "Numbers", "Math"],
    category: "learning",
  },
  {
    id: "shape-sorter",
    title: "Shape Sorter",
    description: "Drag circles, squares, triangles, stars & hearts into their matching geometric holes!",
    emoji: "🔷",
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]",
    tags: ["Shapes", "Drag & Drop", "Geometry"],
    category: "motor",
  },
  {
    id: "feed-caterpillar",
    title: "Feed the Caterpillar",
    description: "Drag delicious healthy food to grow the hungry caterpillar into a majestic butterfly!",
    emoji: "🐛",
    gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    tags: ["Nutrition", "Drag & Drop", "Nature"],
    category: "motor",
  },
  {
    id: "trace-draw",
    title: "Trace & Draw",
    description: "Trace dotted letter and number paths with your finger to practice fine motor handwriting.",
    emoji: "✏️",
    gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
    tags: ["Writing", "Fine Motor", "Drawing"],
    category: "motor",
  },
  {
    id: "catch-fish",
    title: "Catch the Fish",
    description: "Tap swimming ocean creatures underwater! Discover dolphins, whales & friendly turtles.",
    emoji: "🎣",
    gradient: "from-cyan-500/20 via-sky-500/10 to-blue-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
    tags: ["Ocean", "Coordination", "Tap"],
    category: "motor",
  },
  {
    id: "pattern-train",
    title: "Pattern Train",
    description: "Solve color sequences to complete the train cars and send the steam locomotive chugging!",
    emoji: "🚂",
    gradient: "from-teal-500/20 via-cyan-500/10 to-sky-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]",
    tags: ["Patterns", "Logic", "Trains"],
    category: "learning",
  },
  {
    id: "music-maker",
    title: "Music Maker",
    description: "Tap vibrant xylophone notes, animal sounds & drum beats! Record and play back your songs.",
    emoji: "🥁",
    gradient: "from-fuchsia-500/20 via-pink-500/10 to-rose-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]",
    tags: ["Music", "Recording", "Creativity"],
    category: "creative",
  },
  {
    id: "paint-splash",
    title: "Paint Splash",
    description: "Splash vibrant paint colors, drag fluid strokes, and create your digital masterpiece!",
    emoji: "🌈",
    gradient: "from-rose-500/20 via-red-500/10 to-orange-500/20",
    borderGlow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]",
    tags: ["Art", "Colors", "Canvas"],
    category: "creative",
  },
];

const CATEGORIES = [
  { id: "all", label: "🎮 All Games" },
  { id: "learning", label: "🧠 Learning" },
  { id: "motor", label: "🎯 Motor Skills" },
  { id: "creative", label: "🎨 Creative" },
];

/* ─────────── Game Components Map ─────────── */

const GAME_COMPONENTS: Record<string, React.ComponentType<{ onExit?: () => void }>> = {
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

/* ─────────── Main Content Component ─────────── */

function ElonGamesContent() {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { totalStars, completedCount, getRecord } = useElonGameProgress();

  const handlePlay = useCallback((gameId: string) => {
    setActiveGameId(gameId);
  }, []);

  const handleBack = useCallback(() => {
    setActiveGameId(null);
  }, []);

  const activeGameEntry = useMemo(
    () => GAMES.find((g) => g.id === activeGameId),
    [activeGameId]
  );

  const filteredGames = useMemo(() => {
    if (categoryFilter === "all") return GAMES;
    return GAMES.filter((g) => g.category === categoryFilter);
  }, [categoryFilter]);

  /* ─── Active Gameplay Screen ─── */
  if (activeGameId) {
    const GameComponent = GAME_COMPONENTS[activeGameId];
    if (!GameComponent) {
      setActiveGameId(null);
      return null;
    }

    return (
      <div className="fixed inset-0 z-40 bg-zinc-950 overflow-hidden">
        {/* Floating Top Controls */}
        <ElonGameControls onBack={handleBack} gameTitle={activeGameEntry?.title} />

        {/* Mini Game Canvas/View */}
        <GameComponent onExit={handleBack} />
      </div>
    );
  }

  /* ─── Games Hub Screen ─── */
  return (
    <div className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/40 via-zinc-950 to-black text-white overflow-x-hidden flex flex-col justify-between">
      {/* Floating Sparkle Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/20"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -25, 25],
              opacity: [0.1, 0.45, 0.1],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Persistent Top Navigation Bar */}
      <ElonGameHeader totalStars={totalStars} completedCount={completedCount} />

      {/* Main Hub Area */}
      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <section className="pt-8 pb-6 sm:pb-8">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border border-yellow-500/30 mb-4 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-bold tracking-wider uppercase text-yellow-300">
                  Play • Learn • Have Fun
                </span>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-3">
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                  Elon Games
                </span>
              </h1>

              <p className="text-sm sm:text-base text-white/60 max-w-lg mx-auto mb-6">
                Explore {GAMES.length} interactive learning games, earn stars, and master letters, numbers, colors & shapes! 🌟
              </p>

              {/* Category Filter Tabs */}
              <div
                className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto"
                role="tablist"
                aria-label="Filter games by category"
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    role="tab"
                    aria-selected={categoryFilter === cat.id}
                    className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                      categoryFilter === cat.id
                        ? "bg-white/20 text-white border border-white/35 shadow-lg shadow-white/5"
                        : "bg-white/5 text-white/50 border border-white/5 hover:bg-white/10 hover:text-white/80"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Games Grid Section */}
        <section className="pb-16 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
              <AnimatePresence mode="popLayout">
                {filteredGames.map((game) => {
                  const record = getRecord(game.id);
                  return (
                    <ElonGameCard
                      key={game.id}
                      game={game}
                      record={record}
                      onPlay={handlePlay}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/40 text-xs sm:text-sm">
            Made with ❤️ for Elon • Elon Games Platform • {GAMES.length} Interactive Mini-Games
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ─────────── Root Page Export with Audio Provider ─────────── */

export default function ElonGames() {
  return (
    <ElonGameAudioProvider>
      <ElonGamesContent />
    </ElonGameAudioProvider>
  );
}
