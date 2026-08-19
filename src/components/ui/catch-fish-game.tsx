import { useEffect, useRef, useState, useCallback } from "react";
import { useElonGameAudio } from "./elon-games/ElonGameAudioContext";
import { useElonGameProgress } from "./elon-games/useElonGameProgress";
import { ElonGameCompletion } from "./elon-games/ElonGameCompletion";

interface Fish {
  x: number;
  y: number;
  speed: number;
  size: number;
  emoji: string;
  direction: 1 | -1;
  wobble: number;
  wobbleSpeed: number;
  caught: boolean;
  catchTimer: number;
}

interface Bubble {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
}

interface Splash {
  x: number;
  y: number;
  particles: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[];
}

interface CatchFishGameProps {
  onExit?: () => void;
}

const FISH_EMOJIS = ["🐟", "🐠", "🐡", "🦈", "🐙", "🦐", "🦑", "🐳", "🦞", "🐢"];
const FISH_SIZES = [34, 38, 42, 30, 46];

export default function CatchFishGame({ onExit }: CatchFishGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { playSound, speakWord } = useElonGameAudio();
  const { saveResult, getRecord } = useElonGameProgress();

  const [score, setScore] = useState(0);
  const [milestone, setMilestone] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const scoreRef = useRef(0);
  const bestRecord = getRecord("catch-fish");

  const handleFinish = useCallback(() => {
    const finalScore = scoreRef.current;
    const stars = finalScore >= 15 ? 3 : finalScore >= 8 ? 2 : 1;
    saveResult("catch-fish", stars, finalScore);
    setShowCompletion(true);
  }, [saveResult]);

  const resetGame = useCallback(() => {
    scoreRef.current = 0;
    setScore(0);
    setShowCompletion(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const fishes: Fish[] = [];
    const bubbles: Bubble[] = [];
    const splashes: Splash[] = [];

    const spawnFish = (): Fish => {
      const dir = Math.random() > 0.5 ? 1 : -1;
      const speed = 0.6 + Math.random() * 1.4 + scoreRef.current * 0.04;
      return {
        x: dir === 1 ? -60 : w + 60,
        y: 90 + Math.random() * (h - 200),
        speed: speed * dir,
        size: FISH_SIZES[Math.floor(Math.random() * FISH_SIZES.length)],
        emoji: FISH_EMOJIS[Math.floor(Math.random() * FISH_EMOJIS.length)],
        direction: dir as 1 | -1,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        caught: false,
        catchTimer: 0,
      };
    };

    for (let i = 0; i < 8; i++) {
      const f = spawnFish();
      f.x = Math.random() * w;
      fishes.push(f);
    }

    for (let i = 0; i < 16; i++) {
      bubbles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1.5 + Math.random() * 3,
        speed: 0.4 + Math.random() * 0.5,
        opacity: 0.15 + Math.random() * 0.25,
      });
    }

    const seaweeds = Array.from({ length: 8 }, () => ({
      x: Math.random() * w,
      height: 70 + Math.random() * 90,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId = 0;
    let frame = 0;

    const createSplash = (x: number, y: number) => {
      const particles = Array.from({ length: 12 }, () => ({
        x,
        y,
        vx: (Math.random() - 0.5) * 7,
        vy: (Math.random() - 0.5) * 7,
        r: 2 + Math.random() * 3.5,
        opacity: 1,
      }));
      splashes.push({ x, y, particles });
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (const f of fishes) {
        if (f.caught) continue;
        const dx = f.x - cx;
        const dy = f.y - cy;
        if (Math.sqrt(dx * dx + dy * dy) < f.size + 18) {
          f.caught = true;
          f.catchTimer = 30;
          playSound("splash");
          createSplash(f.x, f.y);

          scoreRef.current += 1;
          const nextScore = scoreRef.current;
          setScore(nextScore);

          if (nextScore === 5) {
            playSound("correct");
            speakWord("Dolphin appears!");
            setMilestone("🐬 Dolphin appears!");
            setTimeout(() => setMilestone(null), 2000);
          } else if (nextScore === 10) {
            playSound("celebration");
            speakWord("Whale spotted!");
            setMilestone("🐋 Whale spotted!");
            setTimeout(() => setMilestone(null), 2000);
          } else if (nextScore % 15 === 0) {
            playSound("star");
            setMilestone("🌟 Amazing catch!");
            setTimeout(() => setMilestone(null), 2000);
          }

          break;
        }
      }
    };

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Water gradient
      const waterGrad = ctx.createLinearGradient(0, 0, 0, h);
      waterGrad.addColorStop(0, "#0c4a6e");
      waterGrad.addColorStop(0.5, "#0e3a5e");
      waterGrad.addColorStop(1, "#0a1628");
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, 0, w, h);

      // Light rays
      ctx.save();
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const rx = w * 0.2 + i * w * 0.15;
        ctx.moveTo(rx, 0);
        ctx.lineTo(rx - 40, h);
        ctx.lineTo(rx + 40, h);
        ctx.closePath();
        ctx.fillStyle = `rgba(255,255,255,${0.015 + Math.sin(frame * 0.005 + i) * 0.006})`;
        ctx.fill();
      }
      ctx.restore();

      // Seaweed
      for (const sw of seaweeds) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(sw.x, h);
        const sway = Math.sin(frame * 0.02 + sw.phase) * 12;
        ctx.quadraticCurveTo(sw.x + sway, h - sw.height / 2, sw.x + sway * 1.5, h - sw.height);
        ctx.strokeStyle = "rgba(34,197,94,0.35)";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.restore();
      }

      // Bubbles
      for (const b of bubbles) {
        b.y -= b.speed;
        b.x += Math.sin(frame * 0.02 + b.y * 0.01) * 0.35;
        if (b.y < -10) {
          b.y = h + 10;
          b.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${b.opacity})`;
        ctx.fill();
      }

      // Fish
      for (let i = fishes.length - 1; i >= 0; i--) {
        const f = fishes[i];

        if (f.caught) {
          f.catchTimer--;
          f.y -= 2.5;
          ctx.save();
          ctx.globalAlpha = f.catchTimer / 30;
          ctx.font = `${f.size}px serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(f.emoji, f.x, f.y);
          ctx.restore();

          if (f.catchTimer <= 0) {
            fishes[i] = spawnFish();
          }
          continue;
        }

        f.x += f.speed;
        f.wobble += f.wobbleSpeed;
        f.y += Math.sin(f.wobble) * 0.6;

        if (f.direction === 1 && f.x > w + 80) {
          fishes[i] = spawnFish();
          continue;
        }
        if (f.direction === -1 && f.x < -80) {
          fishes[i] = spawnFish();
          continue;
        }

        ctx.save();
        ctx.translate(f.x, f.y);
        if (f.direction === -1) ctx.scale(-1, 1);
        ctx.font = `${f.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(f.emoji, 0, 0);
        ctx.restore();
      }

      // Splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const sp = splashes[i];
        let alive = false;
        for (const p of sp.particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.15;
          p.opacity -= 0.025;
          if (p.opacity > 0) {
            alive = true;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(147,197,253,${p.opacity})`;
            ctx.fill();
          }
        }
        if (!alive) splashes.splice(i, 1);
      }

      animId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onPointerDown);

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, [playSound, speakWord]);

  return (
    <div className="fixed inset-0 overflow-hidden select-none touch-none pt-12">
      <canvas
        ref={canvasRef}
        className="block w-full h-full touch-none"
        style={{ touchAction: "none" }}
      />

      {/* HUD */}
      <div className="fixed top-14 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        <div className="px-5 py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2">
          <span className="text-white font-black text-xl">🐟 {score}</span>
          <span className="text-white/60 text-xs">Caught</span>
        </div>

        {score >= 8 && (
          <button
            onClick={handleFinish}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Finish ⭐
          </button>
        )}
      </div>

      {/* Milestone */}
      {milestone && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 z-20 px-6 py-3 rounded-2xl bg-cyan-500/30 backdrop-blur-md border border-cyan-400/50 text-cyan-200 text-xl font-bold animate-bounce shadow-2xl">
          {milestone}
        </div>
      )}

      {/* Instructions */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 pointer-events-none">
        <span className="text-white/70 text-xs">Tap the swimming fish to catch them! 🎣</span>
      </div>

      {/* Completion Modal */}
      <ElonGameCompletion
        isOpen={showCompletion}
        gameTitle="Catch the Fish"
        stars={score >= 15 ? 3 : 2}
        score={score}
        bestScore={bestRecord?.bestScore}
        message={`Caught ${score} colorful sea creatures! Outstanding hand-eye coordination!`}
        onPlayAgain={resetGame}
        onExit={onExit || (() => {})}
      />
    </div>
  );
}
