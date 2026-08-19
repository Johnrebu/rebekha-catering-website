import { useEffect, useRef, useState, useCallback } from "react";

/* ─── letter paths (simplified for tracing) ─── */
const LETTER_PATHS: Record<string, { points: [number, number][] }> = {
  A: { points: [[0.2,0.9],[0.5,0.1],[0.8,0.9],[0.65,0.55],[0.35,0.55]] },
  B: { points: [[0.25,0.9],[0.25,0.1],[0.65,0.1],[0.75,0.25],[0.65,0.5],[0.25,0.5],[0.65,0.5],[0.75,0.7],[0.65,0.9],[0.25,0.9]] },
  C: { points: [[0.75,0.2],[0.5,0.1],[0.25,0.3],[0.25,0.7],[0.5,0.9],[0.75,0.8]] },
  D: { points: [[0.25,0.9],[0.25,0.1],[0.55,0.1],[0.75,0.3],[0.75,0.7],[0.55,0.9],[0.25,0.9]] },
  E: { points: [[0.7,0.1],[0.25,0.1],[0.25,0.5],[0.6,0.5],[0.25,0.5],[0.25,0.9],[0.7,0.9]] },
  F: { points: [[0.7,0.1],[0.25,0.1],[0.25,0.5],[0.6,0.5],[0.25,0.5],[0.25,0.9]] },
  O: { points: [[0.5,0.1],[0.25,0.3],[0.25,0.7],[0.5,0.9],[0.75,0.7],[0.75,0.3],[0.5,0.1]] },
  L: { points: [[0.25,0.1],[0.25,0.9],[0.75,0.9]] },
  H: { points: [[0.25,0.1],[0.25,0.9],[0.25,0.5],[0.75,0.5],[0.75,0.1],[0.75,0.9]] },
  I: { points: [[0.35,0.1],[0.65,0.1],[0.5,0.1],[0.5,0.9],[0.35,0.9],[0.65,0.9]] },
  T: { points: [[0.2,0.1],[0.8,0.1],[0.5,0.1],[0.5,0.9]] },
  V: { points: [[0.2,0.1],[0.5,0.9],[0.8,0.1]] },
  X: { points: [[0.2,0.1],[0.8,0.9],[0.5,0.5],[0.2,0.9],[0.8,0.1]] },
  S: { points: [[0.75,0.2],[0.5,0.1],[0.3,0.2],[0.25,0.35],[0.4,0.5],[0.6,0.55],[0.75,0.7],[0.7,0.85],[0.5,0.9],[0.25,0.8]] },
};

// Numbers
const NUMBER_PATHS: Record<string, { points: [number, number][] }> = {
  "1": { points: [[0.35,0.25],[0.5,0.1],[0.5,0.9],[0.3,0.9],[0.7,0.9]] },
  "2": { points: [[0.25,0.25],[0.4,0.1],[0.65,0.1],[0.75,0.25],[0.7,0.45],[0.25,0.9],[0.75,0.9]] },
  "3": { points: [[0.25,0.15],[0.55,0.1],[0.7,0.25],[0.55,0.45],[0.45,0.5],[0.6,0.55],[0.75,0.7],[0.6,0.9],[0.3,0.85]] },
  "0": { points: [[0.5,0.1],[0.25,0.3],[0.25,0.7],[0.5,0.9],[0.75,0.7],[0.75,0.3],[0.5,0.1]] },
};

const ALL_CHARS = [
  ...Object.keys(LETTER_PATHS),
  ...Object.keys(NUMBER_PATHS),
];

const COLORS = ["#ff2e63", "#00d2ff", "#ffd700", "#43e97b", "#9d50bb", "#ff9a9e"];

export default function TraceDrawGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [charIndex, setCharIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const currentChar = ALL_CHARS[charIndex % ALL_CHARS.length];
  const isNumber = currentChar in NUMBER_PATHS;
  const pathData = isNumber
    ? NUMBER_PATHS[currentChar]
    : LETTER_PATHS[currentChar];

  const drawingRef = useRef(false);
  const hitCountRef = useRef(0);
  const totalDotsRef = useRef(0);
  const colorRef = useRef(COLORS[0]);

  const nextChar = useCallback(() => {
    setCharIndex((i) => i + 1);
    setShowComplete(false);
    setAccuracy(0);
    hitCountRef.current = 0;
    colorRef.current = COLORS[Math.floor(Math.random() * COLORS.length)];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !pathData) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = Math.min(window.innerWidth, 500);
    const h = w; // square canvas
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Generate dots along the path
    const dots: { x: number; y: number; hit: boolean }[] = [];
    const pts = pathData.points;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[i + 1];
      const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const steps = Math.max(Math.floor(dist * 20), 3);
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        dots.push({
          x: (x1 + (x2 - x1) * t) * w,
          y: (y1 + (y2 - y1) * t) * h,
          hit: false,
        });
      }
    }
    totalDotsRef.current = dots.length;
    hitCountRef.current = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw dots
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.hit ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = dot.hit ? colorRef.current : "rgba(255,255,255,0.3)";
        ctx.fill();

        if (dot.hit) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = colorRef.current + "30";
          ctx.fill();
        }
      }

      // Draw char label faintly
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.font = `bold ${w * 0.7}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(currentChar, w / 2, h / 2);
    };

    const checkHit = (cx: number, cy: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = cx - rect.left;
      const y = cy - rect.top;

      let newHits = 0;
      for (const dot of dots) {
        if (dot.hit) continue;
        const dx = dot.x - x;
        const dy = dot.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < 18) {
          dot.hit = true;
          newHits++;
        }
      }

      if (newHits > 0) {
        hitCountRef.current += newHits;
        const pct = Math.floor(
          (hitCountRef.current / totalDotsRef.current) * 100
        );
        setAccuracy(pct);

        if (pct >= 85) {
          setScore((s) => s + 10);
          setShowComplete(true);
        }

        draw();
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      drawingRef.current = true;
      checkHit(e.clientX, e.clientY);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (drawingRef.current) checkHit(e.clientX, e.clientY);
    };
    const onMouseUp = () => {
      drawingRef.current = false;
    };
    const onTouchStart = (e: TouchEvent) => {
      drawingRef.current = true;
      if (e.touches[0]) checkHit(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (drawingRef.current && e.touches[0])
        checkHit(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => {
      drawingRef.current = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    draw();

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentChar, pathData]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950 flex flex-col items-center overflow-hidden">
      {/* Header */}
      <div className="w-full max-w-lg px-4 pt-6 z-10">
        <h2 className="text-3xl font-black text-white text-center mb-1">
          ✏️ Trace & Draw
        </h2>
        <p className="text-purple-300/60 text-sm text-center mb-3">
          Trace over the dots with your finger!
        </p>
        <div className="flex justify-center gap-4 text-sm mb-2">
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-purple-200">
            ⭐ {score}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-purple-200 text-xl font-black">
            {currentChar}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-purple-200">
            ✨ {accuracy}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-white/10 overflow-hidden max-w-xs mx-auto">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${accuracy}%`,
              backgroundColor:
                accuracy >= 85 ? "#22c55e" : accuracy >= 50 ? "#eab308" : "#a855f7",
            }}
          />
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center px-4 py-4 z-10">
        <div className="rounded-3xl overflow-hidden border-2 border-white/10 bg-white/[0.03]">
          <canvas
            ref={canvasRef}
            className="block touch-none"
            style={{ cursor: "crosshair" }}
          />
        </div>
      </div>

      {/* Complete overlay */}
      {showComplete && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={nextChar}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-2xl animate-bounce"
          >
            Next Letter ⭐
          </button>
        </div>
      )}
    </div>
  );
}
