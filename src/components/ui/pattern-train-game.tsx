import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── pattern generation ─── */
const COLORS = [
  { name: "Red", value: "#ef4444", emoji: "🔴" },
  { name: "Blue", value: "#3b82f6", emoji: "🔵" },
  { name: "Yellow", value: "#eab308", emoji: "🟡" },
  { name: "Green", value: "#22c55e", emoji: "🟢" },
  { name: "Purple", value: "#a855f7", emoji: "🟣" },
  { name: "Orange", value: "#f97316", emoji: "🟠" },
];

interface PatternRound {
  sequence: number[]; // indices into COLORS
  answerIndex: number; // which position to guess
  options: number[]; // color indices to pick from
}

function generatePattern(level: number): PatternRound {
  const colorCount = Math.min(2 + Math.floor((level - 1) / 3), 5);
  const patternLength = Math.min(4 + Math.floor((level - 1) / 2), 8);

  // Pick random colors for the pattern
  const usedColors = Array.from(
    { length: colorCount },
    (_, i) => i % COLORS.length
  );

  // Create a repeating pattern
  const sequence: number[] = [];
  for (let i = 0; i < patternLength + 1; i++) {
    sequence.push(usedColors[i % usedColors.length]);
  }

  const answerIndex = patternLength; // last one is the answer
  const correctAnswer = sequence[answerIndex];

  // Build options (include correct + random)
  const optSet = new Set<number>();
  optSet.add(correctAnswer);
  while (optSet.size < Math.min(4, COLORS.length)) {
    optSet.add(Math.floor(Math.random() * COLORS.length));
  }
  const options = Array.from(optSet).sort(() => Math.random() - 0.5);

  return { sequence, answerIndex, options };
}

/* ─── train car ─── */
function TrainCar({
  color,
  index,
  isQuestion,
  isCorrect,
}: {
  color?: string;
  index: number;
  isQuestion: boolean;
  isCorrect: boolean;
}) {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, type: "spring", damping: 15 }}
      className="relative"
    >
      {/* Car body */}
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 flex items-center justify-center transition-all ${
          isQuestion
            ? isCorrect
              ? "border-emerald-400 bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              : "border-dashed border-white/40 bg-white/5"
            : "border-white/20"
        }`}
        style={
          !isQuestion && color
            ? { backgroundColor: color + "30", borderColor: color + "60" }
            : {}
        }
      >
        {isQuestion && !isCorrect ? (
          <span className="text-2xl">❓</span>
        ) : isQuestion && isCorrect ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="text-2xl"
          >
            ✅
          </motion.span>
        ) : (
          <div
            className="w-8 h-8 rounded-lg"
            style={{ backgroundColor: color }}
          />
        )}
      </div>

      {/* Wheels */}
      <div className="flex justify-between px-1 -mt-1">
        <div className="w-3 h-3 rounded-full bg-zinc-600 border border-zinc-500" />
        <div className="w-3 h-3 rounded-full bg-zinc-600 border border-zinc-500" />
      </div>

      {/* Connection */}
      {index > 0 && (
        <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-2 h-1 bg-zinc-500 rounded" />
      )}
    </motion.div>
  );
}

/* ─── main ─── */
export default function PatternTrainGame() {
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState<PatternRound>(() =>
    generatePattern(1)
  );
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [wrong, setWrong] = useState(false);
  const [score, setScore] = useState(0);

  const correctColor = pattern.sequence[pattern.answerIndex];

  const handlePick = useCallback(
    (colorIdx: number) => {
      if (answered) return;
      setSelectedAnswer(colorIdx);

      if (colorIdx === correctColor) {
        setAnswered(true);
        setScore((s) => s + 10);
      } else {
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
          setSelectedAnswer(null);
        }, 600);
      }
    },
    [answered, correctColor]
  );

  const nextLevel = useCallback(() => {
    const nl = level + 1;
    setLevel(nl);
    setPattern(generatePattern(nl));
    setAnswered(false);
    setSelectedAnswer(null);
    setWrong(false);
  }, [level]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-sky-950 via-cyan-950 to-teal-950 flex flex-col items-center overflow-auto">
      {/* Header */}
      <div className="w-full max-w-lg px-4 pt-6 z-10">
        <h2 className="text-3xl font-black text-white text-center mb-1">
          🚂 Pattern Train
        </h2>
        <p className="text-cyan-300/60 text-sm text-center mb-3">
          What comes next in the pattern?
        </p>
        <div className="flex justify-center gap-4 text-sm mb-4">
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-cyan-200">
            ⭐ {score}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-cyan-200">
            🚂 Level {level}
          </div>
        </div>
      </div>

      {/* Train */}
      <div className="flex-1 flex items-center justify-center px-4 z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Engine */}
          <div className="flex items-end gap-1 overflow-x-auto max-w-full px-2 pb-4">
            {/* Locomotive */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-4xl mr-1"
            >
              🚂
            </motion.div>

            {/* Cars */}
            {pattern.sequence.map((colorIdx, i) => {
              const isQ = i === pattern.answerIndex;
              const isCorrect = isQ && answered;

              return (
                <TrainCar
                  key={i}
                  color={
                    isQ && !answered
                      ? undefined
                      : COLORS[colorIdx].value
                  }
                  index={i}
                  isQuestion={isQ}
                  isCorrect={isCorrect}
                />
              );
            })}
          </div>

          {/* Track */}
          <div className="w-full max-w-md h-2 bg-zinc-700 rounded-full relative">
            <div className="absolute inset-0 flex justify-between px-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-full bg-zinc-600 rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Answer options */}
      <div className="w-full max-w-lg px-4 py-8 z-10">
        {answered ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={nextLevel}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-xl hover:from-emerald-400 hover:to-cyan-400 transition-all"
          >
            🎉 Next Train! ⭐
          </motion.button>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {pattern.options.map((colorIdx) => (
              <motion.button
                key={colorIdx}
                onClick={() => handlePick(colorIdx)}
                className={`py-5 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all ${
                  selectedAnswer === colorIdx && wrong
                    ? "bg-red-500/20 border-red-400/50"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95"
                }`}
                animate={
                  selectedAnswer === colorIdx && wrong
                    ? { x: [0, -6, 6, -3, 3, 0] }
                    : {}
                }
              >
                <div
                  className="w-10 h-10 rounded-lg"
                  style={{ backgroundColor: COLORS[colorIdx].value }}
                />
                <span className="text-white/50 text-xs">
                  {COLORS[colorIdx].name}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
