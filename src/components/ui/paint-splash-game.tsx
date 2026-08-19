import { useEffect, useRef, useState, useCallback } from "react";
import { useElonGameAudio } from "./elon-games/ElonGameAudioContext";
import { useElonGameProgress } from "./elon-games/useElonGameProgress";
import { ElonGameCompletion } from "./elon-games/ElonGameCompletion";

interface Splat {
  x: number;
  y: number;
  r: number;
  color: string;
  opacity: number;
  drops: { x: number; y: number; r: number }[];
}

interface Stroke {
  points: { x: number; y: number }[];
  color: string;
  width: number;
}

interface PaintSplashGameProps {
  onExit?: () => void;
}

const PALETTE = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f43f5e",
  "#ffffff",
];

export default function PaintSplashGame({ onExit }: PaintSplashGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { playSound } = useElonGameAudio();
  const { saveResult, getRecord } = useElonGameProgress();

  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [brushSize, setBrushSize] = useState(14);
  const [splatCount, setSplatCount] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const splatsRef = useRef<Splat[]>([]);
  const strokesRef = useRef<Stroke[]>([]);
  const drawingRef = useRef(false);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const needsRedrawRef = useRef(true);

  const selectedColorRef = useRef(selectedColor);
  const brushSizeRef = useRef(brushSize);
  selectedColorRef.current = selectedColor;
  brushSizeRef.current = brushSize;
  const bestRecord = getRecord("paint-splash");

  const clearCanvas = useCallback(() => {
    playSound("click");
    splatsRef.current = [];
    strokesRef.current = [];
    currentStrokeRef.current = null;
    needsRedrawRef.current = true;
  }, [playSound]);

  const handleFinish = useCallback(() => {
    const stars = 3;
    saveResult("paint-splash", stars, Math.max(100, splatCount * 10));
    setShowCompletion(true);
  }, [splatCount, saveResult]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight - 130;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      needsRedrawRef.current = true;
    };

    const createSplat = (x: number, y: number) => {
      const r = brushSizeRef.current + Math.random() * 16;
      const drops: Splat["drops"] = [];
      const dropCount = 4 + Math.floor(Math.random() * 6);
      for (let i = 0; i < dropCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = r + Math.random() * r * 0.8;
        drops.push({
          x: x + Math.cos(angle) * dist,
          y: y + Math.sin(angle) * dist,
          r: 2 + Math.random() * 4,
        });
      }

      splatsRef.current.push({
        x,
        y,
        r,
        color: selectedColorRef.current,
        opacity: 0.88,
        drops,
      });
      needsRedrawRef.current = true;
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const pos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      drawingRef.current = true;
      playSound("splash");
      createSplat(pos.x, pos.y);
      setSplatCount((c) => c + 1);

      currentStrokeRef.current = {
        points: [pos],
        color: selectedColorRef.current,
        width: brushSizeRef.current,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drawingRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const pos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      if (currentStrokeRef.current) {
        currentStrokeRef.current.points.push(pos);
        needsRedrawRef.current = true;
      }
    };

    const onPointerUp = () => {
      if (currentStrokeRef.current && currentStrokeRef.current.points.length > 1) {
        strokesRef.current.push(currentStrokeRef.current);
      }
      currentStrokeRef.current = null;
      drawingRef.current = false;
    };

    const drawSplat = (splat: Splat) => {
      ctx.save();
      ctx.globalAlpha = splat.opacity;
      ctx.beginPath();
      ctx.arc(splat.x, splat.y, splat.r, 0, Math.PI * 2);
      ctx.fillStyle = splat.color;
      ctx.fill();

      for (const drop of splat.drops) {
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawStroke = (stroke: Stroke) => {
      if (stroke.points.length < 2) return;
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = 0.85;

      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        const prev = stroke.points[i - 1];
        const curr = stroke.points[i];
        const mx = (prev.x + curr.x) / 2;
        const my = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
      }
      ctx.stroke();
      ctx.restore();
    };

    let animId = 0;

    const render = () => {
      if (needsRedrawRef.current) {
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;

        ctx.fillStyle = "#18181b";
        ctx.fillRect(0, 0, w, h);

        for (const splat of splatsRef.current) {
          drawSplat(splat);
        }

        for (const stroke of strokesRef.current) {
          drawStroke(stroke);
        }

        if (currentStrokeRef.current) {
          drawStroke(currentStrokeRef.current);
        }

        needsRedrawRef.current = false;
      }

      if (drawingRef.current) {
        needsRedrawRef.current = true;
      }

      animId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [playSound]);

  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col overflow-hidden select-none touch-none pt-12">
      {/* Canvas */}
      <div className="flex-1 w-full h-full relative">
        <canvas
          ref={canvasRef}
          className="block w-full h-full touch-none"
          style={{ cursor: "crosshair", touchAction: "none" }}
        />
      </div>

      {/* Toolbar */}
      <div className="w-full bg-zinc-900/90 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3 overflow-x-auto z-20">
        {/* Colors */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {PALETTE.map((color) => (
            <button
              key={color}
              onClick={() => {
                playSound("click");
                setSelectedColor(color);
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all flex-shrink-0 ${
                selectedColor === color
                  ? "border-white scale-110 shadow-lg shadow-white/20"
                  : "border-zinc-700 hover:border-zinc-500"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>

        {/* Brush sizes */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {[8, 16, 26].map((size) => (
            <button
              key={size}
              onClick={() => {
                playSound("click");
                setBrushSize(size);
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                brushSize === size
                  ? "border-white bg-white/20"
                  : "border-zinc-700 hover:border-zinc-500"
              }`}
              aria-label={`Brush size ${size}`}
            >
              <div
                className="rounded-full bg-white"
                style={{ width: Math.min(size, 20), height: Math.min(size, 20) }}
              />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={clearCanvas}
            className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/40 text-red-300 text-xs sm:text-sm font-semibold transition-all"
          >
            🗑️ Clear
          </button>

          <button
            onClick={handleFinish}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Finish Art ⭐
          </button>
        </div>
      </div>

      {/* Completion Modal */}
      <ElonGameCompletion
        isOpen={showCompletion}
        gameTitle="Paint Splash"
        stars={3}
        score={splatCount * 10}
        bestScore={bestRecord?.bestScore}
        message="Your artwork is gorgeous! True creative artist, Elon!"
        onPlayAgain={() => setShowCompletion(false)}
        onExit={onExit || (() => {})}
      />
    </div>
  );
}
