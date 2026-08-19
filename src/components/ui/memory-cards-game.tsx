import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useElonGameAudio } from "./elon-games/ElonGameAudioContext";
import { useElonGameProgress } from "./elon-games/useElonGameProgress";
import { ElonGameCompletion } from "./elon-games/ElonGameCompletion";

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

interface MemoryCardsGameProps {
  onExit?: () => void;
}

const EMOJI_SETS = [
  ["🐶", "🐱", "🐰", "🐸", "🦁", "🐼", "🐨", "🐯", "🦊", "🐮", "🐷", "🐵"],
  ["🍎", "🍌", "🍇", "🍓", "🍊", "🍉", "🍒", "🥝", "🍑", "🍍", "🥭", "🫐"],
  ["⭐", "❤️", "🌈", "🌸", "🦋", "🌺", "🍀", "🌙", "☀️", "🌻", "🎀", "💎"],
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(pairCount: number): Card[] {
  const setIndex = Math.floor(Math.random() * EMOJI_SETS.length);
  const emojis = shuffle(EMOJI_SETS[setIndex]).slice(0, pairCount);
  const pairs = [...emojis, ...emojis];
  return shuffle(pairs).map((emoji, i) => ({
    id: i,
    emoji,
    flipped: false,
    matched: false,
  }));
}

export default function MemoryCardsGame({ onExit }: MemoryCardsGameProps) {
  const { playSound } = useElonGameAudio();
  const { saveResult, getRecord } = useElonGameProgress();

  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<Card[]>(() => buildDeck(4));
  const [selected, setSelected] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [checking, setChecking] = useState(false);
  const [earnedStars, setEarnedStars] = useState(1);

  const bestRecord = getRecord("memory-cards");
  const pairsForLevel = Math.min(4 + (level - 1) * 2, 12);

  const resetGame = useCallback(
    (newLevel?: number) => {
      const lv = newLevel ?? level;
      const pairs = Math.min(4 + (lv - 1) * 2, 12);
      setCards(buildDeck(pairs));
      setSelected([]);
      setMatches(0);
      setMoves(0);
      setWon(false);
      setChecking(false);
      if (newLevel) setLevel(newLevel);
    },
    [level]
  );

  const handleCardClick = useCallback(
    (id: number) => {
      if (checking) return;
      if (selected.includes(id)) return;

      const card = cards[id];
      if (card.matched || card.flipped) return;

      playSound("cardFlip");

      const newCards = [...cards];
      newCards[id] = { ...newCards[id], flipped: true };
      setCards(newCards);

      const newSelected = [...selected, id];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        const nextMoves = moves + 1;
        setMoves(nextMoves);
        setChecking(true);

        const [a, b] = newSelected;
        if (newCards[a].emoji === newCards[b].emoji) {
          // Match!
          setTimeout(() => {
            playSound("correct");
            setCards((prev) =>
              prev.map((c, i) =>
                i === a || i === b ? { ...c, matched: true } : c
              )
            );
            setMatches((m) => {
              const newMatches = m + 1;
              if (newMatches === pairsForLevel) {
                // Determine star rating:
                // <= pairsForLevel + 2 moves = 3 stars
                // <= pairsForLevel * 2 moves = 2 stars
                // else = 1 star
                const stars = nextMoves <= pairsForLevel + 2 ? 3 : nextMoves <= pairsForLevel * 2 ? 2 : 1;
                const score = Math.max(100, 1000 - nextMoves * 40 + level * 200);
                setEarnedStars(stars);
                saveResult("memory-cards", stars, score);
                setWon(true);
              }
              return newMatches;
            });
            setSelected([]);
            setChecking(false);
          }, 500);
        } else {
          // Mismatch
          setTimeout(() => {
            playSound("wrong");
            setCards((prev) =>
              prev.map((c, i) =>
                i === a || i === b ? { ...c, flipped: false } : c
              )
            );
            setSelected([]);
            setChecking(false);
          }, 800);
        }
      }
    },
    [cards, selected, checking, moves, pairsForLevel, level, playSound, saveResult]
  );

  const cols =
    pairsForLevel <= 4
      ? "grid-cols-4"
      : pairsForLevel <= 6
        ? "grid-cols-4"
        : pairsForLevel <= 8
          ? "grid-cols-4"
          : "grid-cols-4 sm:grid-cols-6";

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 flex flex-col items-center overflow-auto select-none pt-12">
      {/* Header */}
      <div className="w-full max-w-lg px-4 pt-4 pb-2">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-black text-white mb-1">🃏 Memory Cards</h2>
          <p className="text-purple-300/70 text-sm">Find all matching pairs!</p>
        </div>

        <div className="flex justify-center gap-3 text-sm mb-4">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-purple-200 font-semibold">
            ⭐ Level {level}
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-purple-200 font-semibold">
            🎯 {matches}/{pairsForLevel} Pairs
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-purple-200 font-semibold">
            👆 {moves} moves
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8 w-full">
        <div className={`grid ${cols} gap-3 max-w-md w-full`}>
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="aspect-square rounded-2xl relative perspective-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              whileTap={{ scale: 0.95 }}
              aria-label={card.flipped || card.matched ? `Card: ${card.emoji}` : "Hidden card"}
              layout
            >
              <AnimatePresence mode="wait">
                {card.flipped || card.matched ? (
                  <motion.div
                    key="front"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute inset-0 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl select-none ${
                      card.matched
                        ? "bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 border-2 border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                        : "bg-gradient-to-br from-white/25 to-white/10 border-2 border-white/40 shadow-lg"
                    }`}
                  >
                    <span className={card.matched ? "animate-bounce" : ""}>
                      {card.emoji}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/40 to-indigo-600/40 border-2 border-purple-400/30 flex items-center justify-center text-3xl hover:border-purple-300/70 hover:from-purple-500/60 hover:to-indigo-600/60 transition-all cursor-pointer shadow-md select-none"
                  >
                    ❓
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Completion Modal */}
      <ElonGameCompletion
        isOpen={won}
        gameTitle="Memory Cards"
        stars={earnedStars}
        score={Math.max(100, 1000 - moves * 40 + level * 200)}
        bestScore={bestRecord?.bestScore}
        message={`Completed in ${moves} moves! Great memory Elon!`}
        onPlayAgain={() => resetGame(level < 5 ? level + 1 : 1)}
        onExit={onExit || (() => {})}
      />
    </div>
  );
}
