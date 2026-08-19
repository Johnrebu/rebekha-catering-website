import { useEffect, useRef, useState, useCallback } from "react";

/* ─── types ─── */
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

const PALETTE = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f43f5e", // rose
  "#ffffff", // white
];

export default function PaintSplashGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [brushSize, setBrushSize] = useState(12);

  const splatsRef = useRef<Splat[]>([]);
  const strokesRef = useRef<Stroke[]>([]);
  const drawingRef = useRef(false);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const needsRedrawRef = useRef(true);

  const selectedColorRef = useRef(selectedColor);
  const brushSizeRef = useRef(brushSize);
  selectedColorRef.current = selectedColor;
  brushSizeRef.current = brushSize;

  const clearCanvas = useCallback(() => {
    splatsRef.current = [];
    strokesRef.current = [];
    currentStrokeRef.current = null;
    needsRedrawRef.current = true;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight - 120; // leave room for palette
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      needsRedrawRef.current = true;
    };

    const createSplat = (x: number, y: number) => {
      const r = brushSizeRef.current + Math.random() * 15;
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
        opacity: 0.85,
        drops,
      });
      needsRedrawRef.current = true;
    };

    const getPos = (e: MouseEvent | TouchEvent): { x: number; y: number } | null => {
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e) {
        if (e.touches[0]) {
          return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top,
          };
        }
        return null;
      }
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onDown = (e: MouseEvent | TouchEvent) => {
      const pos = getPos(e);
      if (!pos) return;

      drawingRef.current = true;

      // Single tap = splat
      createSplat(pos.x, pos.y);

      // Start stroke
      currentStrokeRef.current = {
        points: [pos],
        color: selectedColorRef.current,
        width: brushSizeRef.current,
      };
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!drawingRef.current) return;
      const pos = getPos(e);
      if (!pos) return;

      if (currentStrokeRef.current) {
        currentStrokeRef.current.points.push(pos);
        needsRedrawRef.current = true;
      }
    };

    const onUp = () => {
      if (currentStrokeRef.current && currentStrokeRef.current.points.length > 1) {
        strokesRef.current.push(currentStrokeRef.current);
      }
      currentStrokeRef.current = null;
      drawingRef.current = false;
    };

    const drawSplat = (splat: Splat) => {
      ctx.save();
      ctx.globalAlpha = splat.opacity;

      // Main blob
      ctx.beginPath();
      ctx.arc(splat.x, splat.y, splat.r, 0, Math.PI * 2);
      ctx.fillStyle = splat.color;
      ctx.fill();

      // Drops
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
      ctx.globalAlpha = 0.8;

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

        // White background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);

        // Draw splats
        for (const splat of splatsRef.current) {
          drawSplat(splat);
        }

        // Draw finished strokes
        for (const stroke of strokesRef.current) {
          drawStroke(stroke);
        }

        // Draw current stroke
        if (currentStrokeRef.current) {
          drawStroke(currentStrokeRef.current);
        }

        needsRedrawRef.current = false;
      }

      // Keep rendering while drawing for smooth strokes
      if (drawingRef.current) {
        needsRedrawRef.current = true;
      }

      animId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown, { passive: true });
    canvas.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onDown);
      canvas.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-zinc-900 flex flex-col overflow-hidden">
      {/* Canvas */}
      <div className="flex-1">
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{ cursor: "crosshair", touchAction: "none" }}
        />
      </div>

      {/* Toolbar */}
      <div className="w-full bg-zinc-900 border-t border-zinc-700 px-4 py-3 flex items-center gap-3 overflow-x-auto">
        {/* Color palette */}
        <div className="flex gap-2 flex-shrink-0">
          {PALETTE.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-9 h-9 rounded-full border-2 transition-all flex-shrink-0 ${
                selectedColor === color
                  ? "border-white scale-110 shadow-lg"
                  : "border-zinc-600 hover:border-zinc-400"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-zinc-700 flex-shrink-0" />

        {/* Brush sizes */}
        <div className="flex gap-2 flex-shrink-0">
          {[6, 12, 20, 30].map((size) => (
            <button
              key={size}
              onClick={() => setBrushSize(size)}
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                brushSize === size
                  ? "border-white bg-white/10"
                  : "border-zinc-600 hover:border-zinc-400"
              }`}
            >
              <div
                className="rounded-full bg-white"
                style={{ width: Math.min(size, 24), height: Math.min(size, 24) }}
              />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-zinc-700 flex-shrink-0" />

        {/* Clear */}
        <button
          onClick={clearCanvas}
          className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 text-sm font-medium hover:bg-red-500/30 transition-all flex-shrink-0"
        >
          🗑️ Clear
        </button>
      </div>
    </div>
  );
}
