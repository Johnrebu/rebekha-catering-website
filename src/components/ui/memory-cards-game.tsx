import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── types ─── */
interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
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

/* ─── confetti burst ─── */
function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#ff2e63", "#00d2ff", "#ffd700", "#43e97b", "#9d50bb", "#ff9a9e"][
      Math.floor(Math.random() * 6)
    ],
    delay: Math.random() * 0.3,
    size: Math.random() * 8 + 4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: "-5%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 100,
            opacity: 0,
            rotate: Math.random() * 720 - 360,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: p.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

/* ─── main component ─── */
export default function MemoryCardsGame() {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<Card[]>(() => buildDeck(4));
  const [selected, setSelected] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [checking, setChecking] = useState(false);

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

      const newCards = [...cards];
      newCards[id] = { ...newCards[id], flipped: true };
      setCards(newCards);

      const newSelected = [...selected, id];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        setMoves((m) => m + 1);
        setChecking(true);

        const [a, b] = newSelected;
        if (newCards[a].emoji === newCards[b].emoji) {
          // Match!
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) =>
                i === a || i === b ? { ...c, matched: true } : c
              )
            );
            setMatches((m) => {
              const newMatches = m + 1;
              if (newMatches === pairsForLevel) {
                setWon(true);
              }
              return newMatches;
            });
            setSelected([]);
            setChecking(false);
          }, 600);
        } else {
          // No match — flip back
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) =>
                i === a || i === b ? { ...c, flipped: false } : c
              )
            );
            setSelected([]);
            setChecking(false);
          }, 900);
        }
      }
    },
    [cards, selected, checking, pairsForLevel]
  );

  // Grid columns based on pair count
  const cols =
    pairsForLevel <= 4
      ? "grid-cols-4"
      : pairsForLevel <= 6
        ? "grid-cols-4"
        : pairsForLevel <= 8
          ? "grid-cols-4"
          : "grid-cols-4 sm:grid-cols-6";

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 flex flex-col items-center overflow-auto">
      {won && <Confetti />}

      {/* Header */}
      <div className="w-full max-w-lg px-4 pt-6 pb-2">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-black text-white mb-1">🃏 Memory Cards</h2>
          <p className="text-purple-300/70 text-sm">Find all matching pairs!</p>
        </div>

        <div className="flex justify-center gap-4 text-sm mb-4">
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-purple-200">
            ⭐ Level {level}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-purple-200">
            🎯 {matches}/{pairsForLevel}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white/10 text-purple-200">
            👆 {moves} moves
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="flex-1 flex items-center justify-center px-4 pb-6">
        <div className={`grid ${cols} gap-3 max-w-lg w-full`}>
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="aspect-square rounded-2xl relative perspective-500"
              whileTap={{ scale: 0.95 }}
              layout
            >
              <AnimatePresence mode="wait">
                {card.flipped || card.matched ? (
                  <motion.div
                    key="front"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`absolute inset-0 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl ${
                      card.matched
                        ? "bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 border-2 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        : "bg-gradient-to-br from-white/20 to-white/10 border-2 border-white/30"
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
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/40 to-indigo-600/40 border-2 border-purple-400/30 flex items-center justify-center text-3xl hover:border-purple-300/60 hover:from-purple-500/50 hover:to-indigo-600/50 transition-colors cursor-pointer"
                  >
                    ❓
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Win overlay */}
      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border border-purple-400/30 rounded-3xl p-8 text-center max-w-sm mx-4"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-black text-white mb-2">
                Amazing, Elon!
              </h3>
              <p className="text-purple-200/70 mb-1">
                You found all {pairsForLevel} pairs!
              </p>
              <p className="text-purple-200/50 text-sm mb-6">
                in {moves} moves
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => resetGame(level)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold hover:from-purple-400 hover:to-indigo-400 transition-all"
                >
                  Play Again 🔄
                </button>
                {level < 5 && (
                  <button
                    onClick={() => resetGame(level + 1)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all"
                  >
                    Next Level ⭐
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
