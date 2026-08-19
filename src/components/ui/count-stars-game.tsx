import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useElonGameAudio } from "./elon-games/ElonGameAudioContext";
import { useElonGameProgress } from "./elon-games/useElonGameProgress";
import { ElonGameCompletion } from "./elon-games/ElonGameCompletion";

interface CountStarsGameProps {
  onExit?: () => void;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateStars(count: number): { id: number; x: number; y: number; delay: number; size: number }[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 75,
    y: 10 + Math.random() * 55,
    delay: i * 0.2,
    size: Math.random() * 16 + 28,
  }));
}

export default function CountStarsGame({ onExit }: CountStarsGameProps) {
  const { playSound, speakWord } = useElonGameAudio();
  const { saveResult, getRecord } = useElonGameProgress();

  const [level, setLevel] = useState(1);
  const [answer, setAnswer] = useState<number | null>(null);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);

  const bestRecord = getRecord("count-stars");

  const starCount = useMemo(() => {
    if (level <= 3) return randomInt(1, 4);
    if (level <= 6) return randomInt(3, 7);
    return randomInt(5, 10);
  }, [level]);

  const stars = useMemo(() => generateStars(starCount), [starCount]);

  const options = useMemo(() => {
    const opts = new Set<number>();
    opts.add(starCount);
    while (opts.size < 4) {
      const n = Math.max(1, starCount + randomInt(-2, 2));
      if (n >= 1 && n <= 12) opts.add(n);
    }
    return Array.from(opts).sort((a, b) => a - b);
  }, [starCount]);

  const handlePick = useCallback(
    (n: number) => {
      if (correct) return;
      setAnswer(n);

      if (n === starCount) {
        playSound("correct");
        speakWord(`${n} Stars! Great job!`);
        setCorrect(true);
        const newScore = score + 10;
        setScore(newScore);
        setShowCelebration(true);

        if (level % 5 === 0) {
          const starsEarned = level >= 10 ? 3 : level >= 5 ? 2 : 1;
          saveResult("count-stars", starsEarned, newScore);
          setShowMilestone(true);
        }

        setTimeout(() => setShowCelebration(false), 1500);
      } else {
        playSound("wrong");
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
          setAnswer(null);
        }, 600);
      }
    },
    [starCount, correct, playSound, speakWord, score, level, saveResult]
  );

  const nextRound = useCallback(() => {
    setLevel((l) => l + 1);
    setAnswer(null);
    setCorrect(false);
    setWrong(false);
    setShowMilestone(false);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950 flex flex-col items-center overflow-hidden select-none pt-12">
      {/* Background twinkle stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Header */}
      <div className="relative z-10 w-full max-w-lg px-4 pt-4">
        <div className="text-center mb-2">
          <h2 className="text-3xl font-black text-white mb-1">🔢 Count the Stars</h2>
          <p className="text-blue-300/70 text-sm">How many stars do you see?</p>
        </div>
        <div className="flex justify-center gap-4 text-sm mb-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-blue-200 font-semibold">
            ⭐ Score: {score}
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-blue-200 font-semibold">
            🌙 Round: {level}
          </div>
        </div>
      </div>

      {/* Star field */}
      <div className="relative z-10 flex-1 w-full max-w-lg px-4 flex items-center justify-center">
        <div className="relative w-full h-[280px] sm:h-[340px] rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-sm overflow-hidden shadow-2xl">
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
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              transition={{ duration: 0.4, delay: star.delay }}
            >
              <motion.span
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: Math.random(),
                }}
                className="inline-block drop-shadow-[0_0_12px_rgba(253,224,71,0.6)] cursor-default"
                role="img"
                aria-label="Star"
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
                className="absolute inset-0 flex items-center justify-center bg-emerald-500/20 backdrop-blur-[2px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10 }}
                  className="text-7xl"
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
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-black text-xl hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95"
          >
            Next Round ⭐
          </motion.button>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {options.map((n) => (
              <motion.button
                key={n}
                onClick={() => handlePick(n)}
                className={`py-4 sm:py-5 rounded-2xl text-2xl sm:text-3xl font-black transition-all border-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  answer === n && wrong
                    ? "bg-red-500/30 border-red-400/60 text-red-300"
                    : "bg-white/10 border-white/15 text-white hover:bg-white/20 hover:border-white/30 active:scale-95 shadow-md"
                }`}
                animate={
                  answer === n && wrong
                    ? { x: [0, -6, 6, -3, 3, 0] }
                    : {}
                }
                transition={{ duration: 0.3 }}
                aria-label={`Select number ${n}`}
              >
                {n}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Milestone Modal */}
      <ElonGameCompletion
        isOpen={showMilestone}
        gameTitle="Count the Stars"
        stars={level >= 10 ? 3 : 2}
        score={score}
        bestScore={bestRecord?.bestScore}
        message={`You completed ${level} rounds of star counting! Super math skills!`}
        onPlayAgain={nextRound}
        onExit={onExit || (() => {})}
      />
    </div>
  );
}
