import { useState, useEffect, useCallback } from "react";
import {
  loadProgress,
  recordGameResult,
  subscribeToProgress,
  PlayerProgress,
  GameRecord,
} from "./ElonGameProgress";

export function useElonGameProgress() {
  const [progress, setProgress] = useState<PlayerProgress>(() => loadProgress());

  useEffect(() => {
    // Initial sync
    setProgress(loadProgress());

    // Listen for progress updates
    const unsubscribe = subscribeToProgress((updated) => {
      setProgress(updated);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const saveResult = useCallback(
    (gameId: string, stars: number, score?: number) => {
      return recordGameResult(gameId, stars, score);
    },
    []
  );

  const getRecord = useCallback(
    (gameId: string): GameRecord | null => {
      return progress.completedGames[gameId] || null;
    },
    [progress]
  );

  const completedCount = Object.values(progress.completedGames).filter((g) => g.completed).length;

  return {
    progress,
    totalStars: progress.totalStars,
    completedCount,
    saveResult,
    getRecord,
  };
}
