import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useElonGameAudio } from "./elon-games/ElonGameAudioContext";
import { useElonGameProgress } from "./elon-games/useElonGameProgress";
import { ElonGameCompletion } from "./elon-games/ElonGameCompletion";

interface FoodItem {
  id: number;
  emoji: string;
  name: string;
  healthy: boolean;
  x: number;
  y: number;
}

interface FeedCaterpillarGameProps {
  onExit?: () => void;
}

const HEALTHY_FOODS = [
  { emoji: "🍎", name: "Apple" },
  { emoji: "🍌", name: "Banana" },
  { emoji: "🥕", name: "Carrot" },
  { emoji: "🍇", name: "Grapes" },
  { emoji: "🥦", name: "Broccoli" },
  { emoji: "🍓", name: "Strawberry" },
  { emoji: "🍊", name: "Orange" },
  { emoji: "🥝", name: "Kiwi" },
  { emoji: "🍑", name: "Peach" },
  { emoji: "🥒", name: "Cucumber" },
  { emoji: "🌽", name: "Corn" },
  { emoji: "🍉", name: "Watermelon" },
];

const JUNK_FOODS = [
  { emoji: "🍭", name: "Lollipop" },
  { emoji: "🍩", name: "Donut" },
  { emoji: "🍬", name: "Candy" },
  { emoji: "🍫", name: "Chocolate" },
  { emoji: "🍟", name: "Fries" },
  { emoji: "🧁", name: "Cupcake" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function spawnFood(round: number): FoodItem[] {
  const healthyCount = Math.min(3 + round, 6);
  const junkCount = Math.min(1 + Math.floor(round / 2), 3);
  const healthy = shuffle(HEALTHY_FOODS)
    .slice(0, healthyCount)
    .map((f) => ({ ...f, healthy: true }));
  const junk = shuffle(JUNK_FOODS)
    .slice(0, junkCount)
    .map((f) => ({ ...f, healthy: false }));

  return shuffle([...healthy, ...junk]).map((f, i) => ({
    ...f,
    id: i,
    x: 15 + (i % 4) * 22,
    y: 5 + Math.floor(i / 4) * 30,
  }));
}

function Caterpillar({ segments, face }: { segments: number; face: "happy" | "yuck" | "normal" }) {
  const bodyColors = [
    "#22c55e",
    "#16a34a",
    "#15803d",
    "#22c55e",
    "#16a34a",
    "#15803d",
  ];

  const faceEmoji = face === "happy" ? "😋" : face === "yuck" ? "🤢" : "🐛";

  return (
    <div className="flex items-center justify-center gap-0.5">
      {Array.from({ length: Math.min(segments, 8) }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.06, type: "spring" }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-md"
          style={{ backgroundColor: bodyColors[i % bodyColors.length] }}
        />
      ))}
      <motion.div
        key={`head-${face}`}
        className="text-4xl"
        animate={
          face === "yuck"
            ? { rotate: [0, -10, 10, -5, 0] }
            : face === "happy"
              ? { scale: [1, 1.25, 1] }
              : {}
        }
        transition={{ duration: 0.4 }}
      >
        {faceEmoji}
      </motion.div>
    </div>
  );
}

export default function FeedCaterpillarGame({ onExit }: FeedCaterpillarGameProps) {
  const { playSound, speakWord } = useElonGameAudio();
  const { saveResult, getRecord } = useElonGameProgress();

  const [round, setRound] = useState(1);
  const [foods, setFoods] = useState<FoodItem[]>(() => spawnFood(1));
  const [fed, setFed] = useState<Set<number>>(new Set());
  const [segments, setSegments] = useState(2);
  const [face, setFace] = useState<"happy" | "yuck" | "normal">("normal");
  const [score, setScore] = useState(0);
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [showCompletion, setShowCompletion] = useState(false);

  const caterpillarRef = useRef<HTMLDivElement>(null);
  const bestRecord = getRecord("feed-caterpillar");

  const healthyCount = foods.filter((f) => f.healthy).length;
  const fedHealthy = foods.filter((f) => f.healthy && fed.has(f.id)).length;
  const allFed = fedHealthy === healthyCount;

  useEffect(() => {
    if (allFed && !showCompletion) {
      const stars = segments >= 6 ? 3 : 2;
      saveResult("feed-caterpillar", stars, score);
      setTimeout(() => setShowCompletion(true), 600);
    }
  }, [allFed, showCompletion, segments, score, saveResult]);

  const handleDragStart = useCallback(
    (id: number, clientX: number, clientY: number) => {
      if (fed.has(id)) return;
      playSound("click");
      setDragging(id);
      setDragPos({ x: clientX, y: clientY });
    },
    [fed, playSound]
  );

  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (dragging === null) return;
      setDragPos({ x: clientX, y: clientY });
    },
    [dragging]
  );

  const handleDragEnd = useCallback(() => {
    if (dragging === null) return;

    const food = foods.find((f) => f.id === dragging);
    if (!food) {
      setDragging(null);
      return;
    }

    const catRect = caterpillarRef.current?.getBoundingClientRect();
    if (catRect) {
      const inX = dragPos.x >= catRect.left - 40 && dragPos.x <= catRect.right + 40;
      const inY = dragPos.y >= catRect.top - 40 && dragPos.y <= catRect.bottom + 40;

      if (inX && inY) {
        if (food.healthy) {
          playSound("correct");
          speakWord(`Yummy ${food.name}!`);
          setFed((prev) => new Set(prev).add(food.id));
          setSegments((s) => s + 1);
          setScore((s) => s + 10);
          setFace("happy");
          setTimeout(() => setFace("normal"), 800);
        } else {
          playSound("wrong");
          speakWord(`Yuck, ${food.name} is junk food!`);
          setFace("yuck");
          setTimeout(() => setFace("normal"), 1000);
        }
      }
    }

    setDragging(null);
  }, [dragging, foods, dragPos, playSound, speakWord]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => handleDragMove(e.clientX, e.clientY);
    const onUp = () => handleDragEnd();
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => handleDragEnd();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  const nextRound = useCallback(() => {
    const nr = round + 1;
    setRound(nr);
    setFoods(spawnFood(nr));
    setFed(new Set());
    setShowCompletion(false);
    setFace("normal");
  }, [round]);

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-green-950 via-emerald-950 to-teal-950 flex flex-col items-center select-none touch-none overflow-hidden pt-12"
      style={{ touchAction: "none" }}
    >
      {/* Header */}
      <div className="w-full max-w-lg px-4 pt-4 z-10">
        <h2 className="text-3xl font-black text-white text-center mb-1">
          🐛 Feed the Caterpillar
        </h2>
        <p className="text-emerald-300/70 text-sm text-center mb-3">
          Drag healthy food to the caterpillar!
        </p>
        <div className="flex justify-center gap-4 text-sm mb-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-emerald-200 font-semibold">
            ⭐ {score}
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-emerald-200 font-semibold">
            🍎 {fedHealthy}/{healthyCount} Healthy
          </div>
        </div>
      </div>

      {/* Food grid */}
      <div className="relative z-10 flex-1 w-full max-w-lg px-4 py-2">
        <p className="text-white/50 text-xs text-center mb-3 uppercase tracking-widest font-semibold">
          🍎 Healthy = Grow! &nbsp; • &nbsp; 🍭 Junk = Yuck!
        </p>
        <div className="grid grid-cols-4 gap-3">
          {foods.map((food) => {
            const isFed = fed.has(food.id);
            return (
              <motion.div
                key={food.id}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center border-2 text-3xl sm:text-4xl cursor-grab active:cursor-grabbing transition-all shadow-md ${
                  isFed
                    ? "bg-emerald-500/10 border-emerald-500/30 opacity-30"
                    : food.healthy
                      ? "bg-white/10 border-emerald-400/30 hover:bg-emerald-500/20 hover:border-emerald-400/50"
                      : "bg-white/10 border-red-400/30 hover:bg-red-500/20 hover:border-red-400/50"
                }`}
                style={dragging === food.id ? { opacity: 0.3 } : {}}
                whileTap={isFed ? {} : { scale: 1.05 }}
                onMouseDown={(e) => handleDragStart(food.id, e.clientX, e.clientY)}
                onTouchStart={(e) => {
                  if (e.touches[0])
                    handleDragStart(food.id, e.touches[0].clientX, e.touches[0].clientY);
                }}
                aria-label={`${food.name} (${food.healthy ? "Healthy" : "Junk"})`}
              >
                <span>{food.emoji}</span>
                <span className="text-[10px] text-white/60 font-semibold mt-0.5">{food.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Caterpillar area */}
      <div
        ref={caterpillarRef}
        className="relative z-10 w-full max-w-lg px-4 py-6 flex flex-col items-center"
      >
        <div className="px-6 py-4 rounded-3xl bg-black/40 border border-white/15 backdrop-blur-md shadow-2xl">
          <Caterpillar segments={segments} face={face} />
        </div>
        <p className="text-white/40 text-xs mt-2 font-medium">⬆️ Drag food here to feed!</p>
      </div>

      {/* Floating drag element */}
      {dragging !== null && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: dragPos.x - 30, top: dragPos.y - 30 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/30 backdrop-blur-md border-2 border-white/50 flex items-center justify-center text-4xl shadow-2xl">
            {foods.find((f) => f.id === dragging)?.emoji}
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <ElonGameCompletion
        isOpen={showCompletion}
        gameTitle="Feed the Caterpillar"
        stars={segments >= 6 ? 3 : 2}
        score={score}
        bestScore={bestRecord?.bestScore}
        message="The caterpillar ate all the healthy food and grew strong!"
        onPlayAgain={nextRound}
        onExit={onExit || (() => {})}
      />
    </div>
  );
}
