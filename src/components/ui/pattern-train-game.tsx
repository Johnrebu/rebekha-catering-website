import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useElonGameAudio } from "./elon-games/ElonGameAudioContext";
import { useElonGameProgress } from "./elon-games/useElonGameProgress";
import { ElonGameCompletion } from "./elon-games/ElonGameCompletion";

interface PatternRound {
  sequence: number[];
  answerIndex: number;
  options: number[];
}

interface PatternTrainGameProps {
  onExit?: () => void;
}

const COLORS = [
  { name: "Red", value: "#ef4444", emoji: "🔴" },
  { name: "Blue", value: "#3b82f6", emoji: "🔵" },
  { name: "Yellow", value: "#eab308", emoji: "🟡" },
  { name: "Green", value: "#22c55e", emoji: "🟢" },
  { name: "Purple", value: "#a855f7", emoji: "🟣" },
  { name: "Orange", value: "#f97316", emoji: "🟠" },
];

function generatePattern(level: number): PatternRound {
  const colorCount = Math.min(2 + Math.floor((level - 1) / 3), 5);
  const patternLength = Math.min(4 + Math.floor((level - 1) / 2), 7);

  const usedColors = Array.from(
    { length: colorCount },
    (_, i) => i % COLORS.length
  );

  const sequence: number[] = [];
  for (let i = 0; i < patternLength + 1; i++) {
    sequence.push(usedColors[i % usedColors.length]);
  }

  const answerIndex = patternLength;
  const correctAnswer = sequence[answerIndex];

  const optSet = new Set<number>();
  optSet.add(correctAnswer);
  while (optSet.size < Math.min(4, COLORS.length)) {
    optSet.add(Math.floor(Math.random() * COLORS.length));
  }
  const options = Array.from(optSet).sort(() => Math.random() - 0.5);

  return { sequence, answerIndex, options };
}

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
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.08, type: "spring", damping: 15 }}
      className="relative flex-shrink-0"
    >
      <div
        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border-2 flex items-center justify-center transition-all ${
          isQuestion
            ? isCorrect
              ? "border-emerald-400 bg-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              : "border-dashed border-white/40 bg-white/10"
            : "border-white/25 shadow-md"
        }`}
        style={
          !isQuestion && color
            ? { backgroundColor: color + "40", borderColor: color + "80" }
            : {}
        }
      >
        {isQuestion && !isCorrect ? (
          <span className="text-xl sm:text-2xl">❓</span>
        ) : isQuestion && isCorrect ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="text-xl sm:text-2xl"
          >
            ✅
          </motion.span>
        ) : (
          <div
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg shadow-inner"
            style={{ backgroundColor: color }}
          />
        )}
      </div>

      <div className="flex justify-between px-1 -mt-1">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-600 border border-zinc-400" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-600 border border-zinc-400" />
      </div>

      {index > 0 && (
        <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-1.5 h-1 bg-zinc-400 rounded" />
      )}
    </motion.div>
  );
}

export default function PatternTrainGame({ onExit }: PatternTrainGameProps) {
  const { playSound, speakWord } = useElonGameAudio();
  const { saveResult, getRecord } = useElonGameProgress();

  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState<PatternRound>(() => generatePattern(1));
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [wrong, setWrong] = useState(false);
  const [score, setScore] = useState(0);
  const [showMilestone, setShowMilestone] = useState(false);

  const bestRecord = getRecord("pattern-train");
  const correctColor = pattern.sequence[pattern.answerIndex];

  const handlePick = useCallback(
    (colorIdx: number) => {
      if (answered) return;
      setSelectedAnswer(colorIdx);

      if (colorIdx === correctColor) {
        playSound("correct");
        speakWord(`${COLORS[colorIdx].name}! Chugga chugga choo choo!`);
        setAnswered(true);
        const newScore = score + 10;
        setScore(newScore);

        if (level % 4 === 0) {
          const stars = level >= 8 ? 3 : 2;
          saveResult("pattern-train", stars, newScore);
          setShowMilestone(true);
        }
      } else {
        playSound("wrong");
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
          setSelectedAnswer(null);
        }, 600);
      }
    },
    [answered, correctColor, playSound, speakWord, score, level, saveResult]
  );

  const nextLevel = useCallback(() => {
    const nl = level + 1;
    setLevel(nl);
    setPattern(generatePattern(nl));
    setAnswered(false);
    setSelectedAnswer(null);
    setWrong(false);
    setShowMilestone(false);
  }, [level]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-sky-950 via-cyan-950 to-teal-950 flex flex-col items-center overflow-auto select-none pt-12">
      {/* Header */}
      <div className="w-full max-w-lg px-4 pt-4 z-10">
        <h2 className="text-3xl font-black text-white text-center mb-1">
          🚂 Pattern Train
        </h2>
        <p className="text-cyan-300/70 text-sm text-center mb-3">
          What comes next in the color pattern?
        </p>
        <div className="flex justify-center gap-4 text-sm mb-4">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-cyan-200 font-semibold">
            ⭐ {score}
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-cyan-200 font-semibold">
            🚂 Level {level}
          </div>
        </div>
      </div>

      {/* Train Section */}
      <div className="flex-1 flex items-center justify-center px-4 z-10 w-full max-w-lg">
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex items-end gap-1.5 overflow-x-auto max-w-full px-4 py-4 scrollbar-none">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-4xl sm:text-5xl mr-1 flex-shrink-0"
            >
              🚂
            </motion.div>

            {pattern.sequence.map((colorIdx, i) => {
              const isQ = i === pattern.answerIndex;
              const isCorrect = isQ && answered;

              return (
                <TrainCar
                  key={i}
                  color={isQ && !answered ? undefined : COLORS[colorIdx].value}
                  index={i}
                  isQuestion={isQ}
                  isCorrect={isCorrect}
                />
              );
            })}
          </div>

          <div className="w-full max-w-md h-2.5 bg-zinc-700 rounded-full relative shadow-inner">
            <div className="absolute inset-0 flex justify-between px-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="w-1 h-full bg-zinc-500 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="w-full max-w-lg px-4 py-8 z-10">
        {answered ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={nextLevel}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-black text-xl hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95"
          >
            🎉 Next Train! ⭐
          </motion.button>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {pattern.options.map((colorIdx) => (
              <motion.button
                key={colorIdx}
                onClick={() => handlePick(colorIdx)}
                className={`py-4 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  selectedAnswer === colorIdx && wrong
                    ? "bg-red-500/30 border-red-400/70"
                    : "bg-white/10 border-white/15 hover:bg-white/20 hover:border-white/30 active:scale-95"
                }`}
                animate={
                  selectedAnswer === colorIdx && wrong
                    ? { x: [0, -6, 6, -3, 3, 0] }
                    : {}
                }
                aria-label={`Select ${COLORS[colorIdx].name}`}
              >
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl shadow-md"
                  style={{ backgroundColor: COLORS[colorIdx].value }}
                />
                <span className="text-white/70 text-xs font-semibold">
                  {COLORS[colorIdx].name}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Milestone Modal */}
      <ElonGameCompletion
        isOpen={showMilestone}
        gameTitle="Pattern Train"
        stars={level >= 8 ? 3 : 2}
        score={score}
        bestScore={bestRecord?.bestScore}
        message={`You completed ${level} train patterns with incredible logic!`}
        onPlayAgain={nextLevel}
        onExit={onExit || (() => {})}
      />
    </div>
  );
}
