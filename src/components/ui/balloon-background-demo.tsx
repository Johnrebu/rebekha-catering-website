import { useEffect, useRef, useState, useCallback } from "react";
import { useElonGameAudio } from "./elon-games/ElonGameAudioContext";
import { useElonGameProgress } from "./elon-games/useElonGameProgress";
import { ElonGameCompletion } from "./elon-games/ElonGameCompletion";

interface BalloonBackgroundProps {
  onExit?: () => void;
}

const BALLOON_COLORS = [
  { base: "#ff2e63", light: "#ff6b8f", dark: "#9d0b2e" },
  { base: "#00d2ff", light: "#80eaff", dark: "#006a80" },
  { base: "#ffd700", light: "#fff080", dark: "#998100" },
  { base: "#9d50bb", light: "#c089d8", dark: "#4f285e" },
  { base: "#43e97b", light: "#a6f7c1", dark: "#1e6a38" },
  { base: "#ff9a9e", light: "#fecfef", dark: "#cc7a7e" },
  { base: "#00c9ff", light: "#92fe9d", dark: "#00607a" },
];

export default function BalloonBackground({ onExit }: BalloonBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { playSound } = useElonGameAudio();
  const { saveResult, getRecord } = useElonGameProgress();

  const [score, setScore] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [earnedStars, setEarnedStars] = useState(1);
  const scoreRef = useRef(0);

  const bestRecord = getRecord("balloon-pop");

  const handleFinish = useCallback(
    (finalScore: number) => {
      const stars = finalScore >= 20 ? 3 : finalScore >= 10 ? 2 : 1;
      setEarnedStars(stars);
      saveResult("balloon-pop", stars, finalScore);
      setShowCompletion(true);
    },
    [saveResult]
  );

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

    let balloons: Balloon[] = [];
    let particles: Particle[] = [];
    const mouse = { x: -2000, y: -2000 };
    const balloonCount = 24;
    let animId = 0;

    /* ================= PARTICLES ================= */
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      gravity = 0.2;
      opacity = 1;
      color: string;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 12;
        this.speedY = (Math.random() - 0.5) * 12;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.opacity -= 0.025;
      }

      draw() {
        ctx!.save();
        ctx!.globalAlpha = Math.max(0, this.opacity);
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    /* ================= BALLOONS ================= */
    class Balloon {
      x = 0;
      y = 0;
      r = 0;
      speed = 0;
      angle = 0;
      wobbleSpeed = 0;
      popped = false;
      colorSet = BALLOON_COLORS[0];

      tailMidY = 0;
      tailEndY = 0;
      tailVelMid = 0;
      tailVelEnd = 0;
      prevX = 0;

      constructor(first = true) {
        this.init(first);
      }

      init(firstLoad: boolean) {
        this.r = Math.random() * 14 + 32;
        this.x = Math.random() * (canvas?.width ? canvas.width / (window.devicePixelRatio || 1) : 800);
        this.y = firstLoad
          ? Math.random() * (canvas?.height ? canvas.height / (window.devicePixelRatio || 1) : 600)
          : (canvas?.height ? canvas.height / (window.devicePixelRatio || 1) : 600) + this.r + 150;

        this.colorSet = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
        this.speed = Math.random() * 1.2 + 0.6;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.angle = Math.random() * Math.PI * 2;
        this.popped = false;

        this.prevX = this.x;
        this.tailMidY = this.r + 40;
        this.tailEndY = this.r + 110;
        this.tailVelMid = 0;
        this.tailVelEnd = 0;
      }

      drawBalloonPath(r: number) {
        ctx!.beginPath();
        ctx!.moveTo(0, r);
        ctx!.bezierCurveTo(-r * 1.2, r * 0.8, -r * 1.3, -r * 1.2, 0, -r * 1.2);
        ctx!.bezierCurveTo(r * 1.3, -r * 1.2, r * 1.2, r * 0.8, 0, r);
        ctx!.closePath();
      }

      drawString() {
        const dx = this.x - this.prevX;
        this.prevX = this.x;

        const stiffness = 0.08;
        const damping = 0.85;
        const gravity = 0.35;

        const midTarget = this.r + 40 + Math.abs(dx) * 8;
        this.tailVelMid += (midTarget - this.tailMidY) * stiffness;
        this.tailVelMid *= damping;
        this.tailMidY += this.tailVelMid;

        const endTarget = this.r + 110 + Math.abs(dx) * 14;
        this.tailVelEnd += (endTarget - this.tailEndY) * stiffness;
        this.tailVelEnd *= damping;
        this.tailVelEnd += gravity;
        this.tailEndY += this.tailVelEnd;

        const sway = Math.sin(this.angle * 1.8) * 6 + dx * 4;

        ctx!.beginPath();
        ctx!.moveTo(0, this.r + 5);
        ctx!.bezierCurveTo(
          sway,
          this.tailMidY * 0.5,
          -sway,
          this.tailMidY,
          sway * 0.6,
          this.tailEndY
        );
        ctx!.strokeStyle = "rgba(255,255,255,0.25)";
        ctx!.lineWidth = 1.3;
        ctx!.stroke();
      }

      pop() {
        if (this.popped) return;
        this.popped = true;

        playSound("pop");
        scoreRef.current += 1;
        setScore(scoreRef.current);

        for (let i = 0; i < 20; i++) {
          particles.push(new Particle(this.x, this.y, this.colorSet.base));
        }

        setTimeout(() => this.init(false), 800 + Math.random() * 800);
      }

      update() {
        if (this.popped) return;

        this.y -= this.speed;
        this.angle += this.wobbleSpeed;
        this.x += Math.sin(this.angle * 0.6) * 0.8;

        const dx = this.x - mouse.x;
        const dy = this.y - this.r * 0.2 - mouse.y;
        if (Math.sqrt(dx * dx + dy * dy) < this.r + 15) {
          this.pop();
        }

        const h = canvas!.height / (window.devicePixelRatio || 1);
        if (this.y < -this.r - 180) this.init(false);

        this.draw();
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate(Math.sin(this.angle) * 0.06);

        this.drawString();
        this.drawBalloonPath(this.r);

        const grad = ctx!.createRadialGradient(
          -this.r * 0.3,
          -this.r * 0.5,
          this.r * 0.1,
          0,
          0,
          this.r * 1.5
        );
        grad.addColorStop(0, this.colorSet.light);
        grad.addColorStop(0.4, this.colorSet.base);
        grad.addColorStop(1, this.colorSet.dark);
        ctx!.fillStyle = grad;
        ctx!.globalAlpha = 0.92;
        ctx!.fill();

        ctx!.restore();
      }
    }

    /* ================= RESIZE & EVENTS ================= */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      balloons = [];
      for (let i = 0; i < balloonCount; i++) {
        balloons.push(new Balloon(true));
      }
    };

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      particles = particles.filter((p) => p.opacity > 0);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      balloons.forEach((b) => b.update());

      animId = requestAnimationFrame(animate);
    };

    // Unified Pointer Events for desktop & mobile
    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      mouse.x = px;
      mouse.y = py;

      for (let i = balloons.length - 1; i >= 0; i--) {
        const b = balloons[i];
        if (b.popped) continue;
        const dx = b.x - px;
        const dy = b.y - py;
        if (Math.sqrt(dx * dx + dy * dy) < b.r + 20) {
          b.pop();
          break;
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onPointerLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    resize();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [playSound]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-zinc-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black select-none touch-none">
      <canvas
        ref={canvasRef}
        className="block w-full h-full touch-none"
        style={{ touchAction: "none" }}
      />

      {/* Score HUD */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        <div className="px-5 py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white font-bold text-lg shadow-xl flex items-center gap-2">
          <span>🎈</span>
          <span className="text-yellow-400 font-black">{score}</span>
          <span className="text-white/60 text-xs font-normal">Popped</span>
        </div>

        {score >= 10 && (
          <button
            onClick={() => handleFinish(score)}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Finish ⭐
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 pointer-events-none">
        <span className="text-white/60 text-xs">Tap or move over balloons to pop them! 🎈</span>
      </div>

      {/* Completion Modal */}
      <ElonGameCompletion
        isOpen={showCompletion}
        gameTitle="Balloon Pop"
        stars={earnedStars}
        score={score}
        bestScore={bestRecord?.bestScore}
        message={`You popped ${score} balloons! Incredible accuracy!`}
        onPlayAgain={resetGame}
        onExit={onExit || (() => {})}
      />
    </div>
  );
}
