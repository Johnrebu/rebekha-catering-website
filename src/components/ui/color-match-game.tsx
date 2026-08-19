import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useElonGameAudio } from "./elon-games/ElonGameAudioContext";
import { useElonGameProgress } from "./elon-games/useElonGameProgress";
import { ElonGameCompletion } from "./elon-games/ElonGameCompletion";

interface ColorItem {
  emoji: string;
  color: string;
  name: string;
}

interface ColorMatchGameProps {
  onExit?: () => void;
}

const COLOR_MAP: Record<string, { items: ColorItem[]; bg: string; text: string }> = {
  Red: {
    items: [
      { emoji: "🍎", color: "Red", name: "Apple" },
      { emoji: "🍓", color: "Red", name: "Strawberry" },
      { emoji: "🌹", color: "Red", name: "Rose" },
      { emoji: "❤️", color: "Red", name: "Heart" },
      { emoji: "🍒", color: "Red", name: "Cherry" },
      { emoji: "🦀", color: "Red", name: "Crab" },
    ],
    bg: "from-red-500/30 to-red-600/20",
    text: "#ef4444",
  },
  Blue: {
    items: [
      { emoji: "🫐", color: "Blue", name: "Blueberry" },
      { emoji: "🐳", color: "Blue", name: "Whale" },
      { emoji: "💎", color: "Blue", name: "Diamond" },
      { emoji: "🦋", color: "Blue", name: "Butterfly" },
      { emoji: "💧", color: "Blue", name: "Water" },
      { emoji: "🧢", color: "Blue", name: "Cap" },
    ],
    bg: "from-blue-500/30 to-blue-600/20",
    text: "#3b82f6",
  },
  Yellow: {
    items: [
      { emoji: "🍌", color: "Yellow", name: "Banana" },
      { emoji: "⭐", color: "Yellow", name: "Star" },
      { emoji: "🌻", color: "Yellow", name: "Sunflower" },
      { emoji: "🐤", color: "Yellow", name: "Chick" },
      { emoji: "🌙", color: "Yellow", name: "Moon" },
      { emoji: "🧀", color: "Yellow", name: "Cheese" },
    ],
    bg: "from-yellow-500/30 to-yellow-600/20",
    text: "#eab308",
  },
  Green: {
    items: [
      { emoji: "🍀", color: "Green", name: "Clover" },
      { emoji: "🐸", color: "Green", name: "Frog" },
      { emoji: "🥝", color: "Green", name: "Kiwi" },
      { emoji: "🌿", color: "Green", name: "Herb" },
      { emoji: "🐢", color: "Green", name: "Turtle" },
      { emoji: "🥒", color: "Green", name: "Cucumber" },
    ],
    bg: "from-green-500/30 to-green-600/20",
    text: "#22c55e",
  },
  Orange: {
    items: [
      { emoji: "🍊", color: "Orange", name: "Orange" },
      { emoji: "🥕", color: "Orange", name: "Carrot" },
      { emoji: "🦊", color: "Orange", name: "Fox" },
      { emoji: "🏀", color: "Orange", name: "Basketball" },
      { emoji: "🍑", color: "Orange", name: "Peach" },
      { emoji: "🧡", color: "Orange", name: "Heart" },
    ],
    bg: "from-orange-500/30 to-orange-600/20",
    text: "#f97316",
  },
  Purple: {
    items: [
      { emoji: "🍇", color: "Purple", name: "Grapes" },
      { emoji: "🔮", color: "Purple", name: "Crystal" },
      { emoji: "🍆", color: "Purple", name: "Eggplant" },
      { emoji: "👾", color: "Purple", name: "Alien" },
      { emoji: "💜", color: "Purple", name: "Heart" },
      { emoji: "🌸", color: "Purple", name: "Flower" },
    ],
    bg: "from-purple-500/30 to-purple-600/20",
    text: "#a855f7",
  },
};

const ALL_COLORS = Object.keys(COLOR_MAP);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRound(
  targetColor: string,
  colorCount: number
): { items: ColorItem[]; target: string } {
  const target = targetColor;
  const correctItems = shuffle(COLOR_MAP[target].items).slice(0, 3);

  const otherColors = shuffle(
    ALL_COLORS.filter((c) => c !== target)
  ).slice(0, colorCount - 1);

  const wrongItems: ColorItem[] = [];
  for (const oc of otherColors) {
    const pick = shuffle(COLOR_MAP[oc].items).slice(0, 2);
    wrongItems.push(...pick);
  }

  const items = shuffle([...correctItems, ...wrongItems.slice(0, 9)]);
  return { items, target };
}

export default function ColorMatchGame({ onExit }: ColorMatchGameProps) {
  const { playSound, speakWord } = useElonGameAudio();
  const { saveResult, getRecord } = useElonGameProgress();

  const [level, setLevel] = useState(1);
  const [round, setRound] = useState(() => {
    const color = ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)];
    return buildRound(color, 2);
  });
  const [found, setFound] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [roundComplete, setRoundComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  const bestRecord = getRecord("color-match");
  const correctCount = round.items.filter((it) => it.color === round.target).length;

  useEffect(() => {
    speakWord(`Find all ${round.target} things`);
  }, [round.target, speakWord]);

  // Timer
  useEffect(() => {
    if (roundComplete) return;
    if (timeLeft <= 0) {
      setRoundComplete(true);
      const stars = score >= 100 ? 3 : score >= 50 ? 2 : 1;
      saveResult("color-match", stars, score);
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, roundComplete, score, saveResult]);

  const handleTap = useCallback(
    (index: number) => {
      if (roundComplete) return;
      if (found.has(index)) return;

      const item = round.items[index];
      if (item.color === round.target) {
        playSound("correct");
        const newFound = new Set(found);
        newFound.add(index);
        setFound(newFound);
        const newScore = score + 10 + streak * 5;
        setScore(newScore);
        setStreak((s) => s + 1);

        if (newFound.size === correctCount) {
          setRoundComplete(true);
          const stars = level >= 4 ? 3 : level >= 2 ? 2 : 1;
          saveResult("color-match", stars, newScore);
        }
      } else {
        playSound("wrong");
        setWrong(index);
        setStreak(0);
        setTimeout(() => setWrong(null), 500);
      }
    },
    [round, found, correctCount, roundComplete, streak, playSound, score, level, saveResult]
  );

  const nextRound = useCallback(() => {
    const newLevel = level + 1;
    const colorCount = Math.min(2 + Math.floor((newLevel - 1) / 2), 6);
    const color = ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)];
    setRound(buildRound(color, colorCount));
    setFound(new Set());
    setWrong(null);
    setRoundComplete(false);
    setLevel(newLevel);
    setTimeLeft(Math.max(12, 22 - newLevel));
  }, [level]);

  const targetData = COLOR_MAP[round.target];
  const allFound = found.size === correctCount;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-zinc-950 to-neutral-950 flex flex-col items-center overflow-auto select-none pt-12">
      {/* Header */}
      <div className="w-full max-w-lg px-4 pt-4 pb-2 z-10">
        <div className="text-center mb-3">
          <h2 className="text-3xl font-black text-white mb-1">🎨 Color Match</h2>
          <div
            className={`inline-block px-5 py-2 rounded-2xl bg-gradient-to-r ${targetData.bg} border border-white/20 mt-2 shadow-lg`}
          >
            <span className="text-white/80 text-sm font-medium">Find all </span>
            <span className="text-2xl font-black" style={{ color: targetData.text }}>
              {round.target}
            </span>
            <span className="text-white/80 text-sm font-medium"> things!</span>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex justify-between items-center gap-3 mb-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-white font-bold text-sm">
            ⭐ {score}
          </div>
          <div className="flex-1">
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor: timeLeft > 5 ? "#22c55e" : "#ef4444",
                }}
                animate={{ width: `${(timeLeft / 20) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-white font-bold text-sm">
            🎯 {found.size}/{correctCount}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8 w-full">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-md w-full">
          {round.items.map((item, i) => {
            const isFound = found.has(i);
            const isWrong = wrong === i;

            return (
              <motion.button
                key={`${level}-${i}`}
                onClick={() => handleTap(i)}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-4xl sm:text-5xl transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  isFound
                    ? "bg-emerald-500/30 border-emerald-400/60 scale-95 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : isWrong
                      ? "bg-red-500/30 border-red-400/60"
                      : "bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/25 active:scale-95 shadow-md"
                }`}
                animate={
                  isWrong
                    ? { x: [0, -8, 8, -4, 4, 0] }
                    : isFound
                      ? { scale: [1, 1.15, 1] }
                      : {}
                }
                transition={{ duration: 0.35 }}
                aria-label={`${item.name} (${item.color})`}
              >
                <span className={isFound ? "animate-bounce" : ""}>
                  {item.emoji}
                </span>
                {isFound && (
                  <span className="text-[10px] text-emerald-400 font-bold mt-0.5">✓</span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Completion Modal */}
      <ElonGameCompletion
        isOpen={roundComplete}
        gameTitle="Color Match"
        stars={allFound ? (level >= 3 ? 3 : 2) : 1}
        score={score}
        bestScore={bestRecord?.bestScore}
        message={allFound ? `Found all ${round.target} items in round ${level}!` : "Time's up! Great effort!"}
        onPlayAgain={nextRound}
        onExit={onExit || (() => {})}
      />
    </div>
  );
}
