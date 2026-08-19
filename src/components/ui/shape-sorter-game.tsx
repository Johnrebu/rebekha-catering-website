import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useElonGameAudio } from "./elon-games/ElonGameAudioContext";
import { useElonGameProgress } from "./elon-games/useElonGameProgress";
import { ElonGameCompletion } from "./elon-games/ElonGameCompletion";

interface Shape {
  id: string;
  type: "circle" | "square" | "triangle" | "star" | "heart";
  color: string;
  emoji: string;
  placed: boolean;
}

interface ShapeSorterGameProps {
  onExit?: () => void;
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
    ? { fill: "none", stroke: color, strokeWidth: 3, strokeDasharray: "6 4", opacity: 0.6 }
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

export default function ShapeSorterGame({ onExit }: ShapeSorterGameProps) {
  const { playSound, speakWord } = useElonGameAudio();
  const { saveResult, getRecord } = useElonGameProgress();

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
  const bestRecord = getRecord("shape-sorter");

  const allPlaced = shapes.every((s) => s.placed);

  useEffect(() => {
    if (allPlaced && !won) {
      const stars = level >= 3 ? 3 : level >= 2 ? 2 : 1;
      saveResult("shape-sorter", stars, score);
      setTimeout(() => setWon(true), 500);
    }
  }, [allPlaced, won, level, saveResult, score]);

  const handleDragStart = useCallback(
    (id: string, clientX: number, clientY: number) => {
      playSound("click");
      setDragging(id);
      setDragPos({ x: clientX, y: clientY });
    },
    [playSound]
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

    let matched = false;
    holeRefs.current.forEach((el, type) => {
      const rect = el.getBoundingClientRect();
      const inX = dragPos.x >= rect.left && dragPos.x <= rect.right;
      const inY = dragPos.y >= rect.top && dragPos.y <= rect.bottom;

      if (inX && inY) {
        if (draggedShape.type === type && !draggedShape.placed) {
          matched = true;
          playSound("correct");
          speakWord(type);
          setShapes((prev) =>
            prev.map((s) => (s.id === dragging ? { ...s, placed: true } : s))
          );
          setScore((sc) => sc + 10);
          setLastCorrect(type);
          setTimeout(() => setLastCorrect(null), 600);
        } else if (draggedShape.type !== type) {
          playSound("wrong");
          setLastWrong(type);
          setTimeout(() => setLastWrong(null), 500);
        }
      }
    });

    setDragging(null);
  }, [dragging, shapes, dragPos, playSound, speakWord]);

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

  const holeOrder = shapes.map((s) => s.type);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-amber-950 via-orange-950 to-red-950 flex flex-col items-center select-none touch-none overflow-hidden pt-12"
      style={{ touchAction: "none" }}
    >
      {/* Header */}
      <div className="w-full max-w-lg px-4 pt-4 pb-2 z-10">
        <h2 className="text-3xl font-black text-white text-center mb-1">
          🔷 Shape Sorter
        </h2>
        <p className="text-orange-300/70 text-sm text-center mb-3">
          Drag each shape to its matching hole!
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-orange-200 font-semibold">
            ⭐ {score}
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-orange-200 font-semibold">
            📐 Level {level}
          </div>
        </div>
      </div>

      {/* Shapes to drag (top area) */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 px-4 py-6">
        {shapes
          .filter((s) => !s.placed)
          .map((shape) => (
            <motion.div
              key={shape.id}
              className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-white/30 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg"
              whileTap={{ scale: 1.1 }}
              onMouseDown={(e) => handleDragStart(shape.id, e.clientX, e.clientY)}
              onTouchStart={(e) => {
                if (e.touches[0])
                  handleDragStart(shape.id, e.touches[0].clientX, e.touches[0].clientY);
              }}
              style={dragging === shape.id ? { opacity: 0.3 } : {}}
              aria-label={`Draggable ${shape.type}`}
            >
              <ShapeSVG type={shape.type} color={shape.color} size={52} />
            </motion.div>
          ))}
      </div>

      {/* Indicator */}
      <div className="text-white/30 text-2xl my-1">⬇️</div>

      {/* Holes (bottom area) */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 px-4 py-4">
        {holeOrder.map((type) => {
          const shapeDef = shapes.find((s) => s.type === type)!;
          const isPlaced = shapeDef?.placed;

          return (
            <motion.div
              key={type}
              ref={(el) => {
                if (el) holeRefs.current.set(type, el);
              }}
              className={`w-24 h-24 rounded-2xl border-2 flex items-center justify-center transition-all duration-200 shadow-md ${
                lastCorrect === type
                  ? "bg-emerald-500/30 border-emerald-400/70"
                  : lastWrong === type
                    ? "bg-red-500/30 border-red-400/70"
                    : isPlaced
                      ? "bg-white/15 border-white/30"
                      : "bg-white/5 border-dashed border-white/30"
              }`}
              animate={
                lastCorrect === type
                  ? { scale: [1, 1.15, 1] }
                  : lastWrong === type
                    ? { x: [0, -5, 5, -3, 3, 0] }
                    : {}
              }
              aria-label={`Target hole for ${type}`}
            >
              {isPlaced ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12 }}
                >
                  <ShapeSVG type={type} color={shapeDef.color} size={56} />
                </motion.div>
              ) : (
                <ShapeSVG type={type} color={shapeDef?.color || "#ffffff"} size={56} outline />
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
          <div className="w-20 h-20 rounded-2xl bg-white/30 backdrop-blur-md border-2 border-white/50 flex items-center justify-center shadow-2xl">
            <ShapeSVG
              type={shapes.find((s) => s.id === dragging)!.type}
              color={shapes.find((s) => s.id === dragging)!.color}
              size={52}
            />
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <ElonGameCompletion
        isOpen={won}
        gameTitle="Shape Sorter"
        stars={level >= 3 ? 3 : 2}
        score={score}
        bestScore={bestRecord?.bestScore}
        message="All shapes sorted accurately! Great motor skills!"
        onPlayAgain={nextLevel}
        onExit={onExit || (() => {})}
      />
    </div>
  );
}
