import { useEffect, useRef, useState, useCallback } from "react";

/* ─── types ─── */
interface LetterBalloon {
  x: number;
  y: number;
  r: number;
  letter: string;
  speed: number;
  wobbleSpeed: number;
  angle: number;
  popped: boolean;
  correct: boolean;
  color: { base: string; light: string; dark: string };
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  gravity: number;
  opacity: number;
  color: string;
}

const COLORS = [
  { base: "#ff2e63", light: "#ff6b8f", dark: "#9d0b2e" },
  { base: "#00d2ff", light: "#80eaff", dark: "#006a80" },
  { base: "#ffd700", light: "#fff080", dark: "#998100" },
  { base: "#9d50bb", light: "#c089d8", dark: "#4f285e" },
  { base: "#43e97b", light: "#a6f7c1", dark: "#1e6a38" },
  { base: "#ff9a9e", light: "#fecfef", dark: "#cc7a7e" },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function ABCPopGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [targetLetter, setTargetLetter] = useState("A");
  const [letterIndex, setLetterIndex] = useState(0);
  const [feedback, setFeedback] = useState<{
    text: string;
    color: string;
  } | null>(null);
  const [completed, setCompleted] = useState(false);

  const balloonsRef = useRef<LetterBalloon[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const animRef = useRef<number>(0);

  const pickNewTarget = useCallback(
    (index: number) => {
      if (index >= ALPHABET.length) {
        setCompleted(true);
        return;
      }
      setTargetLetter(ALPHABET[index]);
      setLetterIndex(index);
    },
    []
  );

  const showFeedback = useCallback(
    (text: string, color: string) => {
      setFeedback({ text, color });
      setTimeout(() => setFeedback(null), 1200);
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createBalloon = (firstLoad: boolean): LetterBalloon => {
      const r = Math.random() * 12 + 32;
      // Pick a random letter, with bias toward the current target
      const isTarget = Math.random() < 0.3;
      const letter = isTarget
        ? ALPHABET[letterIndex]
        : ALPHABET[Math.floor(Math.random() * ALPHABET.length)];

      return {
        x: Math.random() * window.innerWidth,
        y: firstLoad
          ? Math.random() * window.innerHeight
          : window.innerHeight + r + 100 + Math.random() * 200,
        r,
        letter,
        speed: Math.random() * 0.8 + 0.4,
        wobbleSpeed: Math.random() * 0.02 + 0.008,
        angle: Math.random() * Math.PI * 2,
        popped: false,
        correct: false,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    };

    // Init balloons
    balloonsRef.current = Array.from({ length: 18 }, () =>
      createBalloon(true)
    );

    const spawnSparkles = (x: number, y: number, color: string) => {
      for (let i = 0; i < 15; i++) {
        sparklesRef.current.push({
          x,
          y,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 10,
          speedY: (Math.random() - 0.5) * 10,
          gravity: 0.15,
          opacity: 1,
          color,
        });
      }
    };

    const handleClick = (e: MouseEvent | TouchEvent) => {
      let cx: number, cy: number;
      if ("touches" in e) {
        cx = e.touches[0]?.clientX ?? (e as TouchEvent).changedTouches[0]?.clientX ?? 0;
        cy = e.touches[0]?.clientY ?? (e as TouchEvent).changedTouches[0]?.clientY ?? 0;
      } else {
        cx = e.clientX;
        cy = e.clientY;
      }

      for (let i = balloonsRef.current.length - 1; i >= 0; i--) {
        const b = balloonsRef.current[i];
        if (b.popped) continue;
        const dx = b.x - cx;
        const dy = b.y - cy;
        if (Math.sqrt(dx * dx + dy * dy) < b.r + 10) {
          b.popped = true;
          spawnSparkles(b.x, b.y, b.color.base);

          if (b.letter === ALPHABET[letterIndex]) {
            b.correct = true;
            setScore((s) => s + 1);
            showFeedback("🎉 Great job!", "#43e97b");
            const nextIndex = letterIndex + 1;
            pickNewTarget(nextIndex);
          } else {
            showFeedback(`That's "${b.letter}" — try again!`, "#ff9a9e");
          }

          // Respawn after delay
          setTimeout(() => {
            const idx = balloonsRef.current.indexOf(b);
            if (idx !== -1) {
              balloonsRef.current[idx] = createBalloon(false);
            }
          }, 1500);

          break;
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw sparkles
      sparklesRef.current = sparklesRef.current.filter(
        (s) => s.opacity > 0
      );
      for (const s of sparklesRef.current) {
        s.x += s.speedX;
        s.y += s.speedY;
        s.speedY += s.gravity;
        s.opacity -= 0.02;
        ctx.save();
        ctx.globalAlpha = Math.max(0, s.opacity);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Update & draw balloons
      for (const b of balloonsRef.current) {
        if (b.popped) continue;

        b.y -= b.speed;
        b.angle += b.wobbleSpeed;
        b.x += Math.sin(b.angle * 0.6) * 0.6;

        if (b.y < -b.r - 150) {
          Object.assign(b, createBalloon(false));
        }

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(Math.sin(b.angle) * 0.04);

        // String
        ctx.beginPath();
        ctx.moveTo(0, b.r + 5);
        ctx.bezierCurveTo(
          Math.sin(b.angle) * 4,
          b.r + 40,
          -Math.sin(b.angle) * 4,
          b.r + 70,
          Math.sin(b.angle) * 2,
          b.r + 100
        );
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Body
        ctx.beginPath();
        ctx.moveTo(0, b.r);
        ctx.bezierCurveTo(
          -b.r * 1.2, b.r * 0.8,
          -b.r * 1.3, -b.r * 1.2,
          0, -b.r * 1.2
        );
        ctx.bezierCurveTo(
          b.r * 1.3, -b.r * 1.2,
          b.r * 1.2, b.r * 0.8,
          0, b.r
        );
        ctx.closePath();

        const grad = ctx.createRadialGradient(
          -b.r * 0.3, -b.r * 0.4, b.r * 0.1,
          0, 0, b.r * 1.4
        );
        grad.addColorStop(0, b.color.light);
        grad.addColorStop(0.4, b.color.base);
        grad.addColorStop(1, b.color.dark);
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.9;
        ctx.fill();

        // Letter
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${b.r * 0.9}px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.letter, 0, -b.r * 0.1);

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", handleClick, { passive: true });

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleClick);
    };
  }, [letterIndex, pickNewTarget, showFeedback]);

  if (completed) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-7xl mb-4">🏆</div>
          <h2 className="text-4xl font-black text-white mb-2">
            WOW, Elon!
          </h2>
          <p className="text-emerald-300/70 text-lg mb-2">
            You learned all 26 letters!
          </p>
          <p className="text-emerald-200/50 mb-6">Score: {score}</p>
          <button
            onClick={() => {
              setCompleted(false);
              setScore(0);
              setLetterIndex(0);
              setTargetLetter("A");
              pickNewTarget(0);
            }}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg hover:from-emerald-400 hover:to-cyan-400 transition-all"
          >
            Play Again 🔄
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-950 via-indigo-950 to-purple-950 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Target letter HUD */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <div className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
          <p className="text-white/60 text-xs mb-1 uppercase tracking-widest">
            Pop the letter
          </p>
          <span className="text-5xl font-black text-white drop-shadow-lg">
            {targetLetter}
          </span>
        </div>
        <div className="mt-2 px-3 py-1 rounded-full bg-white/10 text-white/50 text-xs">
          {letterIndex + 1} / 26
        </div>
      </div>

      {/* Score */}
      <div className="fixed top-4 right-4 z-10 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
        <span className="text-yellow-400 font-bold text-lg">⭐ {score}</span>
      </div>

      {/* Feedback popup */}
      {feedback && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div
            className="px-6 py-3 rounded-2xl backdrop-blur-md border border-white/20 text-xl font-bold animate-bounce"
            style={{
              backgroundColor: feedback.color + "30",
              color: feedback.color,
            }}
          >
            {feedback.text}
          </div>
        </div>
      )}
    </div>
  );
}
