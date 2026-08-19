import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── food items ─── */
interface FoodItem {
  id: number;
  emoji: string;
  name: string;
  healthy: boolean;
  x: number;
  y: number;
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

/* ─── caterpillar body ─── */
function Caterpillar({ segments, face }: { segments: number; face: "happy" | "yuck" | "normal" }) {
  const bodyColors = [
    "#22c55e",
    "#16a34a",
    "#15803d",
    "#22c55e",
    "#16a34a",
    "#15803d",
    "#22c55e",
    "#16a34a",
  ];

  const faceEmoji =
    face === "happy" ? "😋" : face === "yuck" ? "🤢" : "🐛";

  return (
    <div className="flex items-center justify-center gap-0.5">
      {/* Body segments */}
      {Array.from({ length: Math.min(segments, 8) }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.08, type: "spring" }}
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: bodyColors[i % bodyColors.length] }}
        />
      ))}
      {/* Head */}
      <motion.div
        key={`head-${face}`}
        className="text-4xl"
        animate={
          face === "yuck"
            ? { rotate: [0, -10, 10, -5, 0] }
            : face === "happy"
              ? { scale: [1, 1.2, 1] }
              : {}
        }
        transition={{ duration: 0.5 }}
      >
        {faceEmoji}
      </motion.div>
    </div>
  );
}

/* ─── main ─── */
export default function FeedCaterpillarGame() {
  const [round, setRound] = useState(1);
  const [foods, setFoods] = useState<FoodItem[]>(() => spawnFood(1));
  const [fed, setFed] = useState<Set<number>>(new Set());
  const [segments, setSegments] = useState(2);
  const [face, setFace] = useState<"happy" | "yuck" | "normal">("normal");
  const [score, setScore] = useState(0);
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isButterfly, setIsButterfly] = useState(false);
  const caterpillarRef = useRef<HTMLDivElement>(null);

  const healthyCount = foods.filter((f) => f.healthy).length;
  const fedHealthy = foods.filter((f) => f.healthy && fed.has(f.id)).length;
  const allFed = fedHealthy === healthyCount;

  useEffect(() => {
    if (segments >= 10 && allFed) {
      setTimeout(() => setIsButterfly(true), 800);
    }
  }, [segments, allFed]);

  const handleDragStart = useCallback(
    (id: number, clientX: number, clientY: number) => {
      if (fed.has(id)) return;
      setDragging(id);
      setDragPos({ x: clientX, y: clientY });
    },
    [fed]
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

    // Check if near caterpillar
    const catRect = caterpillarRef.current?.getBoundingClientRect();
    if (catRect) {
      const inX = dragPos.x >= catRect.left - 30 && dragPos.x <= catRect.right + 30;
      const inY = dragPos.y >= catRect.top - 30 && dragPos.y <= catRect.bottom + 30;

      if (inX && inY) {
        if (food.healthy) {
          setFed((prev) => new Set(prev).add(food.id));
          setSegments((s) => s + 1);
          setScore((s) => s + 10);
          setFace("happy");
          setTimeout(() => setFace("normal"), 800);
        } else {
          setFace("yuck");
          setTimeout(() => setFace("normal"), 1000);
        }
      }
    }

    setDragging(null);
  }, [dragging, foods, dragPos]);

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
    setIsButterfly(false);
    setFace("normal");
  }, [round]);

  /* ─── butterfly ending ─── */
  if (isButterfly) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 8, duration: 1 }}
          className="text-center"
        >
          <motion.div
            className="text-8xl mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🦋
          </motion.div>
          <h2 className="text-4xl font-black text-white mb-2">
            Beautiful Butterfly!
          </h2>
          <p className="text-emerald-300/70 text-lg mb-6">
            The caterpillar grew into a butterfly!
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <button
              onClick={nextRound}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all"
            >
              Play Again 🔄
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-950 via-emerald-950 to-teal-950 flex flex-col items-center select-none touch-none overflow-hidden">
      {/* Header */}
      <div className="w-full max-w-lg px-4 pt-6 z-10">
        <h2 className="text-3xl font-black text-white text-center mb-1">
          🐛 Feed the Caterpillar
        </h2>
        <p className="text-emerald-300/60 text-sm text-center mb-3">
          Drag healthy food to the caterpillar!
        </p>
        <div className="flex justify-center gap-4 text-sm mb-4">
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-emerald-200">
            ⭐ {score}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-emerald-200">
            🍎 {fedHealthy}/{healthyCount}
          </div>
        </div>
      </div>

      {/* Food grid */}
      <div className="relative z-10 flex-1 w-full max-w-lg px-4 py-2">
        <p className="text-white/40 text-xs text-center mb-3 uppercase tracking-widest">
          🍎 Healthy = Good! &nbsp; 🍭 Junk = Yuck!
        </p>
        <div className="grid grid-cols-4 gap-3">
          {foods.map((food) => {
            const isFed = fed.has(food.id);
            return (
              <motion.div
                key={food.id}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center border-2 text-4xl cursor-grab active:cursor-grabbing transition-all ${
                  isFed
                    ? "bg-emerald-500/10 border-emerald-500/30 opacity-40"
                    : food.healthy
                      ? "bg-white/5 border-emerald-500/20 hover:bg-emerald-500/10"
                      : "bg-white/5 border-red-500/20 hover:bg-red-500/10"
                }`}
                style={dragging === food.id ? { opacity: 0.3 } : {}}
                whileTap={isFed ? {} : { scale: 1.05 }}
                onMouseDown={(e) => handleDragStart(food.id, e.clientX, e.clientY)}
                onTouchStart={(e) => {
                  if (e.touches[0])
                    handleDragStart(food.id, e.touches[0].clientX, e.touches[0].clientY);
                }}
              >
                <span>{food.emoji}</span>
                <span className="text-[10px] text-white/40 mt-0.5">{food.name}</span>
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
        <div className="px-6 py-4 rounded-3xl bg-white/5 border border-white/10">
          <Caterpillar segments={segments} face={face} />
        </div>
        <p className="text-white/30 text-xs mt-2">⬆️ Drag food here!</p>
      </div>

      {/* Floating drag element */}
      {dragging !== null && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: dragPos.x - 30, top: dragPos.y - 30 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-4xl shadow-2xl">
            {foods.find((f) => f.id === dragging)?.emoji}
          </div>
        </div>
      )}

      {/* All fed overlay */}
      <AnimatePresence>
        {allFed && !isButterfly && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-gradient-to-br from-emerald-900/95 to-teal-900/95 border border-emerald-400/30 rounded-3xl p-8 text-center max-w-sm mx-4"
            >
              <div className="text-6xl mb-3">🎉</div>
              <h3 className="text-3xl font-black text-white mb-2">
                Great Job, Elon!
              </h3>
              <p className="text-emerald-200/60 mb-6">
                The caterpillar ate all the healthy food!
              </p>
              <button
                onClick={nextRound}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all"
              >
                Next Round ⭐
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
