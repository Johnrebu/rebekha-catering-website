import { useEffect, useRef, useState, useCallback } from "react";
import { useElonGameAudio } from "./elon-games/ElonGameAudioContext";
import { useElonGameProgress } from "./elon-games/useElonGameProgress";
import { ElonGameCompletion } from "./elon-games/ElonGameCompletion";

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

interface ABCPopGameProps {
  onExit?: () => void;
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

const LETTER_WORDS: Record<string, string> = {
  A: "Apple",
  B: "Ball",
  C: "Cat",
  D: "Dog",
  E: "Elephant",
  F: "Fish",
  G: "Giraffe",
  H: "House",
  I: "Ice Cream",
  J: "Juice",
  K: "Kangaroo",
  L: "Lion",
  M: "Monkey",
  N: "Nest",
  O: "Orange",
  P: "Panda",
  Q: "Queen",
  R: "Rainbow",
  S: "Star",
  T: "Tiger",
  U: "Umbrella",
  V: "Violin",
  W: "Whale",
  X: "Xylophone",
  Y: "Yacht",
  Z: "Zebra",
};

export default function ABCPopGame({ onExit }: ABCPopGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { playSound, speakLetter } = useElonGameAudio();
  const { saveResult, getRecord } = useElonGameProgress();

  const [score, setScore] = useState(0);
  const [targetLetter, setTargetLetter] = useState("A");
  const [letterIndex, setLetterIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; color: string } | null>(null);
  const [completed, setCompleted] = useState(false);
  const [earnedStars, setEarnedStars] = useState(3);

  const balloonsRef = useRef<LetterBalloon[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const animRef = useRef<number>(0);
  const bestRecord = getRecord("abc-pop");

  const showFeedback = useCallback((text: string, color: string) => {
    setFeedback({ text, color });
    setTimeout(() => setFeedback(null), 1200);
  }, []);

  const pickNewTarget = useCallback(
    (index: number) => {
      if (index >= ALPHABET.length) {
        const stars = 3;
        setEarnedStars(stars);
        saveResult("abc-pop", stars, 260);
        setCompleted(true);
        return;
      }
      const newLetter = ALPHABET[index];
      setTargetLetter(newLetter);
      setLetterIndex(index);
      speakLetter(newLetter, LETTER_WORDS[newLetter]);
    },
    [saveResult, speakLetter]
  );

  // Announce initial letter A on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      speakLetter("A", "Apple");
    }, 600);
    return () => clearTimeout(timer);
  }, [speakLetter]);

  const restartGame = useCallback(() => {
    setCompleted(false);
    setScore(0);
    setLetterIndex(0);
    setTargetLetter("A");
    pickNewTarget(0);
  }, [pickNewTarget]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createBalloon = (firstLoad: boolean): LetterBalloon => {
      const r = Math.random() * 12 + 34;
      const isTarget = Math.random() < 0.35;
      const letter = isTarget
        ? ALPHABET[letterIndex]
        : ALPHABET[Math.floor(Math.random() * ALPHABET.length)];

      return {
        x: Math.random() * (window.innerWidth - 60) + 30,
        y: firstLoad
          ? Math.random() * (window.innerHeight - 100) + 50
          : window.innerHeight + r + 100 + Math.random() * 200,
        r,
        letter,
        speed: Math.random() * 0.9 + 0.45,
        wobbleSpeed: Math.random() * 0.02 + 0.008,
        angle: Math.random() * Math.PI * 2,
        popped: false,
        correct: false,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    };

    balloonsRef.current = Array.from({ length: 16 }, () => createBalloon(true));

    const spawnSparkles = (x: number, y: number, color: string) => {
      for (let i = 0; i < 16; i++) {
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

    // Unified pointerdown event prevents duplicate touch + click calls
    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (let i = balloonsRef.current.length - 1; i >= 0; i--) {
        const b = balloonsRef.current[i];
        if (b.popped) continue;

        const dx = b.x - cx;
        const dy = b.y - cy;
        if (Math.sqrt(dx * dx + dy * dy) < b.r + 15) {
          b.popped = true;
          playSound("pop");
          spawnSparkles(b.x, b.y, b.color.base);

          if (b.letter === ALPHABET[letterIndex]) {
            b.correct = true;
            playSound("correct");
            setScore((s) => s + 10);
            showFeedback(`🎉 "${b.letter}" - ${LETTER_WORDS[b.letter]}!`, "#43e97b");
            const nextIndex = letterIndex + 1;
            pickNewTarget(nextIndex);
          } else {
            playSound("wrong");
            speakLetter(b.letter);
            showFeedback(`That's "${b.letter}" — Find "${targetLetter}"!`, "#ff9a9e");
          }

          setTimeout(() => {
            const idx = balloonsRef.current.indexOf(b);
            if (idx !== -1) {
              balloonsRef.current[idx] = createBalloon(false);
            }
          }, 1200);

          break;
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Sparkles
      sparklesRef.current = sparklesRef.current.filter((s) => s.opacity > 0);
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

      // Balloons
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
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Balloon Body
        ctx.beginPath();
        ctx.moveTo(0, b.r);
        ctx.bezierCurveTo(-b.r * 1.2, b.r * 0.8, -b.r * 1.3, -b.r * 1.2, 0, -b.r * 1.2);
        ctx.bezierCurveTo(b.r * 1.3, -b.r * 1.2, b.r * 1.2, b.r * 0.8, 0, b.r);
        ctx.closePath();

        const grad = ctx.createRadialGradient(-b.r * 0.3, -b.r * 0.4, b.r * 0.1, 0, 0, b.r * 1.4);
        grad.addColorStop(0, b.color.light);
        grad.addColorStop(0.4, b.color.base);
        grad.addColorStop(1, b.color.dark);
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.92;
        ctx.fill();

        // Letter
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${b.r * 0.95}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.letter, 0, -b.r * 0.08);

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onPointerDown);

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, [letterIndex, pickNewTarget, playSound, showFeedback, speakLetter, targetLetter]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-950 via-indigo-950 to-purple-950 overflow-hidden select-none touch-none pt-12">
      <canvas
        ref={canvasRef}
        className="block w-full h-full touch-none"
        style={{ touchAction: "none" }}
      />

      {/* Target letter HUD */}
      <div className="fixed top-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
        <div className="px-6 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-center shadow-xl">
          <p className="text-white/70 text-[11px] mb-0.5 uppercase tracking-widest font-semibold">
            Pop the Letter
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl sm:text-5xl font-black text-white drop-shadow-md">
              {targetLetter}
            </span>
            <span className="text-sm font-bold text-emerald-300">
              ({LETTER_WORDS[targetLetter]})
            </span>
          </div>
        </div>
        <div className="mt-2 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-semibold">
          {letterIndex + 1} / 26 Letters
        </div>
      </div>

      {/* Score */}
      <div className="fixed top-14 right-4 z-10 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 shadow-xl">
        <span className="text-yellow-400 font-bold text-base sm:text-lg">⭐ {score}</span>
      </div>

      {/* Feedback popup */}
      {feedback && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div
            className="px-6 py-3 rounded-2xl backdrop-blur-xl border border-white/20 text-lg sm:text-xl font-bold shadow-2xl animate-bounce text-center"
            style={{
              backgroundColor: feedback.color + "30",
              color: feedback.color,
            }}
          >
            {feedback.text}
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <ElonGameCompletion
        isOpen={completed}
        gameTitle="ABC Pop"
        stars={earnedStars}
        score={score}
        bestScore={bestRecord?.bestScore}
        message="You learned all 26 letters of the alphabet! Brilliant job!"
        onPlayAgain={restartGame}
        onExit={onExit || (() => {})}
      />
    </div>
  );
}
