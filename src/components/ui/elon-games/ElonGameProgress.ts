/**
 * Elon Games Progress & Star Persistence Engine
 * Saves games completed, earned stars (1-3), and best scores in localStorage.
 * Includes a lightweight pub/sub emitter so UI updates immediately without refreshing.
 */

export const PROGRESS_STORAGE_KEY = "elon-games-progress";

export interface GameRecord {
  completed: boolean;
  stars: number; // 1, 2, or 3
  bestScore?: number;
  completedAt?: string;
}

export interface PlayerProgress {
  totalStars: number;
  completedGames: Record<string, GameRecord>;
}

const DEFAULT_PROGRESS: PlayerProgress = {
  totalStars: 0,
  completedGames: {},
};

type ProgressListener = (progress: PlayerProgress) => void;
const listeners: Set<ProgressListener> = new Set();

function notifyListeners(progress: PlayerProgress) {
  listeners.forEach((listener) => {
    try {
      listener(progress);
    } catch {
      // ignore
    }
  });
}

/**
 * Load player progress from localStorage
 */
export function loadProgress(): PlayerProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      const completedGames: Record<string, GameRecord> = parsed.completedGames || {};
      let calculatedStars = 0;
      Object.values(completedGames).forEach((rec) => {
        calculatedStars += rec.stars || 0;
      });
      return {
        totalStars: calculatedStars,
        completedGames,
      };
    }
    return DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

/**
 * Save player progress to localStorage
 */
export function saveProgress(progress: PlayerProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    notifyListeners(progress);
  } catch {
    // ignore
  }
}

/**
 * Record a mini-game result and calculate star awards & personal best
 */
export function recordGameResult(
  gameId: string,
  earnedStars: number,
  score?: number
): {
  newStarsEarned: number;
  isPersonalBest: boolean;
  updatedProgress: PlayerProgress;
} {
  const current = loadProgress();
  const existing = current.completedGames[gameId] || {
    completed: false,
    stars: 0,
    bestScore: 0,
  };

  const clampedStars = Math.max(1, Math.min(3, earnedStars));
  const newStarsEarned = Math.max(0, clampedStars - existing.stars);
  const isPersonalBest = score !== undefined && (existing.bestScore === undefined || score > existing.bestScore);
  const bestScore = score !== undefined ? Math.max(score, existing.bestScore || 0) : existing.bestScore;

  const updatedGameRecord: GameRecord = {
    completed: true,
    stars: Math.max(existing.stars, clampedStars),
    bestScore,
    completedAt: new Date().toISOString(),
  };

  const updatedGames = {
    ...current.completedGames,
    [gameId]: updatedGameRecord,
  };

  let totalStars = 0;
  Object.values(updatedGames).forEach((rec) => {
    totalStars += rec.stars || 0;
  });

  const updatedProgress: PlayerProgress = {
    totalStars,
    completedGames: updatedGames,
  };

  saveProgress(updatedProgress);

  return {
    newStarsEarned,
    isPersonalBest,
    updatedProgress,
  };
}

/**
 * Get record for a single game
 */
export function getGameRecord(gameId: string): GameRecord | null {
  const progress = loadProgress();
  return progress.completedGames[gameId] || null;
}

/**
 * Subscribe to progress changes across components
 */
export function subscribeToProgress(listener: ProgressListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
