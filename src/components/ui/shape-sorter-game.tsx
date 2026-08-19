import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── shapes ─── */
interface Shape {
  id: string;
  type: "circle" | "square" | "triangle" | "star" | "heart";
  color: string;
  emoji: string;
  placed: boolean;
}

const SHAPE_DEFS: Omit<Shape, "id" | "placed">[] = [
  { type: "circle", color: "#ef4444", emoji: "🔴" },
  { type: "square", color: "#3b82f6", emoji: "🟦" },
  { type: "triangle", color: "#22c55e", emoji: "🔺" },
  { type: "star", color: "#eab308", emoji: "⭐" },
  { type: "heart", color: "#ec4899", emoji: "❤️" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildLevel(count: number): Shape[] {
  return shuffle(SHAPE_DEFS)
    .slice(0, count)
    .map((s, i) => ({ ...s, id: `shape-${i}`, placed: false }));
}

/* ─── shape SVGs ─── */
function ShapeSVG({
  type,
  color,
  size = 48,
  outline = false,
}: {
  type: string;
  color: string;
  size?: number;
  outline?: boolean;
}) {
  const style = outline
    ? { fill: "none", stroke: color, strokeWidth: 3, strokeDasharray: "6 4", opacity: 0.5 }
    : { fill: color, stroke: "none" };

  switch (type) {
    case "circle":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" {...style} />
        </svg>
      );
    case "square":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <rect x="6" y="6" width="36" height="36" rx="4" {...style} />
        </svg>
      );
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <polygon points="24,4 44,44 4,44" {...style} />
        </svg>
      );
    case "star":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <polygon
            points="24,2 30,18 48,18 34,28 38,46 24,36 10,46 14,28 0,18 18,18"
            {...style}
          />
        </svg>
      );
    case "heart":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <path
            d="M24 44 C24 44 4 30 4 16 C4 8 10 2 18 2 C22 2 24 6 24 6 C24 6 26 2 30 2 C38 2 44 8 44 16 C44 30 24 44 24 44Z"
            {...style}
          />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── main ─── */
export default function ShapeSorterGame() {
  const [level, setLevel] = useState(1);
  const shapeCount = Math.min(2 + level, 5);
  const [shapes, setShapes] = useState<Shape[]>(() => buildLevel(shapeCount));
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [lastCorrect, setLastCorrect] = useState<string | null>(null);
  const [lastWrong, setLastWrong] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const holeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const allPlaced = shapes.every((s) => s.placed);

  useEffect(() => {
    if (allPlaced && !won) {
      setTimeout(() => setWon(true), 500);
    }
  }, [allPlaced, won]);

  const handleDragStart = useCallback(
    (id: string, clientX: number, clientY: number) => {
      setDragging(id);
      setDragPos({ x: clientX, y: clientY });
    },
    []
  );

  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragging) return;
      setDragPos({ x: clientX, y: clientY });
    },
    [dragging]
  );

  const handleDragEnd = useCallback(() => {
    if (!dragging) return;

    const draggedShape = shapes.find((s) => s.id === dragging);
    if (!draggedShape) {
      setDragging(null);
      return;
    }

    // Check if over a hole
    let matched = false;
    holeRefs.current.forEach((el, type) => {
      const rect = el.getBoundingClientRect();
      const inX = dragPos.x >= rect.left && dragPos.x <= rect.right;
      const inY = dragPos.y >= rect.top && dragPos.y <= rect.bottom;

      if (inX && inY) {
        if (draggedShape.type === type && !draggedShape.placed) {
          // Correct!
          matched = true;
          setShapes((prev) =>
            prev.map((s) =>
              s.id === dragging ? { ...s, placed: true } : s
            )
          );
          setScore((sc) => sc + 10);
          setLastCorrect(type);
          setTimeout(() => setLastCorrect(null), 600);
        } else if (draggedShape.type !== type) {
          // Wrong hole
          setLastWrong(type);
          setTimeout(() => setLastWrong(null), 500);
        }
      }
    });

    if (!matched) {
      // Bounce back (nothing needed since we re-render)
    }

    setDragging(null);
  }, [dragging, shapes, dragPos]);

  // Mouse / Touch handlers on container
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

  const nextLevel = useCallback(() => {
    const nl = level + 1;
    const sc = Math.min(2 + nl, 5);
    setLevel(nl);
    setShapes(buildLevel(sc));
    setWon(false);
    setDragging(null);
    setLastCorrect(null);
    setLastWrong(null);
  }, [level]);

  const holeOrder = shuffle(shapes.map((s) => s.type));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-amber-950 via-orange-950 to-red-950 flex flex-col items-center select-none touch-none overflow-hidden"
    >
      {/* Header */}
      <div className="w-full max-w-lg px-4 pt-6 pb-2 z-10">
        <h2 className="text-3xl font-black text-white text-center mb-1">
          🔷 Shape Sorter
        </h2>
        <p className="text-orange-300/60 text-sm text-center mb-3">
          Drag each shape to its matching hole!
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-orange-200">
            ⭐ {score}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-orange-200">
            📐 Level {level}
          </div>
        </div>
      </div>

      {/* Shapes to drag (top area) */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 px-4 py-8">
        {shapes
          .filter((s) => !s.placed)
          .map((shape) => (
            <motion.div
              key={shape.id}
              className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center cursor-grab active:cursor-grabbing"
              whileTap={{ scale: 1.1 }}
              onMouseDown={(e) =>
                handleDragStart(shape.id, e.clientX, e.clientY)
              }
              onTouchStart={(e) => {
                if (e.touches[0])
                  handleDragStart(
                    shape.id,
                    e.touches[0].clientX,
                    e.touches[0].clientY
                  );
              }}
              style={
                dragging === shape.id
                  ? { opacity: 0.3 }
                  : {}
              }
            >
              <ShapeSVG type={shape.type} color={shape.color} size={52} />
            </motion.div>
          ))}
      </div>

      {/* Arrow */}
      <div className="text-white/20 text-3xl my-2">⬇️</div>

      {/* Holes (bottom area) */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 px-4 py-6">
        {holeOrder.map((type) => {
          const shapeDef = shapes.find((s) => s.type === type)!;
          const isPlaced = shapeDef.placed;

          return (
            <motion.div
              key={type}
              ref={(el) => {
                if (el) holeRefs.current.set(type, el);
              }}
              className={`w-24 h-24 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                lastCorrect === type
                  ? "bg-emerald-500/20 border-emerald-400/50"
                  : lastWrong === type
                    ? "bg-red-500/20 border-red-400/50"
                    : isPlaced
                      ? "bg-white/10 border-white/20"
                      : "bg-white/5 border-dashed border-white/20"
              }`}
              animate={
                lastCorrect === type
                  ? { scale: [1, 1.1, 1] }
                  : lastWrong === type
                    ? { x: [0, -5, 5, -3, 3, 0] }
                    : {}
              }
            >
              {isPlaced ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 10 }}
                >
                  <ShapeSVG type={type} color={shapeDef.color} size={56} />
                </motion.div>
              ) : (
                <ShapeSVG
                  type={type}
                  color={shapeDef.color}
                  size={56}
                  outline
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Floating drag element */}
      {dragging && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: dragPos.x - 40,
            top: dragPos.y - 40,
          }}
        >
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center shadow-2xl">
            <ShapeSVG
              type={shapes.find((s) => s.id === dragging)!.type}
              color={shapes.find((s) => s.id === dragging)!.color}
              size={52}
            />
          </div>
        </div>
      )}

      {/* Win overlay */}
      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-gradient-to-br from-orange-900/95 to-amber-900/95 border border-orange-400/30 rounded-3xl p-8 text-center max-w-sm mx-4"
            >
              <div className="text-6xl mb-3">🎉</div>
              <h3 className="text-3xl font-black text-white mb-2">
                Well Done, Elon!
              </h3>
              <p className="text-orange-200/60 mb-6">
                All shapes sorted perfectly!
              </p>
              <button
                onClick={nextLevel}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all"
              >
                Next Level ⭐
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
