import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── helpers ─── */
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ─── star positions ─── */
function generateStars(count: number): { id: number; x: number; y: number; delay: number; size: number }[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 50,
    delay: i * 0.3,
    size: Math.random() * 16 + 28,
  }));
}

export default function CountStarsGame() {
  const [level, setLevel] = useState(1);
  const [answer, setAnswer] = useState<number | null>(null);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const starCount = useMemo(() => {
    if (level <= 3) return randomInt(1, 3);
    if (level <= 6) return randomInt(2, 5);
    if (level <= 10) return randomInt(3, 7);
    return randomInt(4, 10);
  }, [level]);

  const stars = useMemo(() => generateStars(starCount), [starCount]);

  const options = useMemo(() => {
    const opts = new Set<number>();
    opts.add(starCount);
    while (opts.size < 4) {
      const n = Math.max(1, starCount + randomInt(-2, 2));
      if (n >= 1 && n <= 10) opts.add(n);
    }
    return Array.from(opts).sort((a, b) => a - b);
  }, [starCount]);

  const handlePick = useCallback(
    (n: number) => {
      if (correct) return;
      setAnswer(n);
      if (n === starCount) {
        setCorrect(true);
        setScore((s) => s + 10);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      } else {
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
          setAnswer(null);
        }, 800);
      }
    },
    [starCount, correct]
  );

  const nextRound = useCallback(() => {
    setLevel((l) => l + 1);
    setAnswer(null);
    setCorrect(false);
    setWrong(false);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950 flex flex-col items-center overflow-hidden">
      {/* Shooting stars on celebration */}
      <AnimatePresence>
        {showCelebration &&
          Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`shoot-${i}`}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full shadow-[0_0_8px_rgba(253,224,71,0.8)]"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                opacity: 1,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 10,
                opacity: 0,
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.5,
                delay: i * 0.15,
                ease: "easeIn",
              }}
            />
          ))}
      </AnimatePresence>

      {/* Background twinkle stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Header */}
      <div className="relative z-10 w-full max-w-lg px-4 pt-6">
        <div className="text-center mb-2">
          <h2 className="text-3xl font-black text-white mb-1">🔢 Count the Stars</h2>
          <p className="text-blue-300/60 text-sm">How many stars do you see?</p>
        </div>
        <div className="flex justify-center gap-4 text-sm mb-4">
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-blue-200">
            ⭐ Score: {score}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-blue-200">
            🌙 Round: {level}
          </div>
        </div>
      </div>

      {/* Star field */}
      <div className="relative z-10 flex-1 w-full max-w-lg px-4">
        <div className="relative w-full h-full min-h-[300px] rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                fontSize: star.size,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: star.delay,
              }}
            >
              <motion.span
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random(),
                }}
                className="inline-block drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]"
              >
                ⭐
              </motion.span>
            </motion.div>
          ))}

          {/* Correct overlay */}
          <AnimatePresence>
            {correct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-emerald-500/10 backdrop-blur-[2px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10 }}
                  className="text-6xl"
                >
                  🎉
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Number buttons */}
      <div className="relative z-10 w-full max-w-lg px-4 py-6">
        {correct ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={nextRound}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-xl hover:from-emerald-400 hover:to-cyan-400 transition-all"
          >
            Next Round ⭐
          </motion.button>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {options.map((n) => (
              <motion.button
                key={n}
                onClick={() => handlePick(n)}
                className={`py-5 rounded-2xl text-3xl font-black transition-all border-2 ${
                  answer === n && wrong
                    ? "bg-red-500/20 border-red-400/50 text-red-300"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 active:scale-95"
                }`}
                animate={
                  answer === n && wrong
                    ? { x: [0, -6, 6, -3, 3, 0] }
                    : {}
                }
                transition={{ duration: 0.4 }}
              >
                {n}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
