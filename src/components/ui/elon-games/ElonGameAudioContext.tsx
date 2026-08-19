import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { elonAudio, SoundEffectType } from "./ElonGameAudio";

const SOUND_STORAGE_KEY = "elon-games-sound-enabled";

interface ElonGameAudioContextType {
  soundEnabled: boolean;
  isMusicPlaying: boolean;
  toggleSound: () => void;
  playSound: (effect: SoundEffectType) => void;
  speakLetter: (letter: string, wordExample?: string) => void;
  speakWord: (word: string) => void;
  startMusic: () => void;
  stopMusic: () => void;
}

const ElonGameAudioContext = createContext<ElonGameAudioContextType | null>(null);

export const ElonGameAudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const stored = localStorage.getItem(SOUND_STORAGE_KEY);
      return stored !== null ? stored === "true" : true;
    } catch {
      return true;
    }
  });

  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  // Sync mute state with audio engine
  useEffect(() => {
    elonAudio.setMuted(!soundEnabled);
    try {
      localStorage.setItem(SOUND_STORAGE_KEY, String(soundEnabled));
    } catch {
      // ignore
    }
    if (!soundEnabled) {
      elonAudio.stopBackgroundMusic();
      setIsMusicPlaying(false);
    }
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      elonAudio.setMuted(!next);
      if (next) {
        elonAudio.unlockAudio();
        elonAudio.playEffect("click");
        elonAudio.startBackgroundMusic();
        setIsMusicPlaying(true);
      } else {
        elonAudio.stopBackgroundMusic();
        setIsMusicPlaying(false);
      }
      return next;
    });
  }, []);

  const playSound = useCallback(
    (effect: SoundEffectType) => {
      if (!soundEnabled) return;
      elonAudio.unlockAudio();
      elonAudio.playEffect(effect);
    },
    [soundEnabled]
  );

  const speakLetter = useCallback(
    (letter: string, wordExample?: string) => {
      if (!soundEnabled) return;
      elonAudio.unlockAudio();
      elonAudio.speakLetter(letter, wordExample);
    },
    [soundEnabled]
  );

  const speakWord = useCallback(
    (word: string) => {
      if (!soundEnabled) return;
      elonAudio.unlockAudio();
      elonAudio.speakWord(word);
    },
    [soundEnabled]
  );

  const startMusic = useCallback(() => {
    if (!soundEnabled) return;
    elonAudio.unlockAudio();
    elonAudio.startBackgroundMusic();
    setIsMusicPlaying(true);
  }, [soundEnabled]);

  const stopMusic = useCallback(() => {
    elonAudio.stopBackgroundMusic();
    setIsMusicPlaying(false);
  }, []);

  // Autoplay handler: Start music & unlock audio on user's first gesture
  useEffect(() => {
    let unlocked = false;

    const handleFirstGesture = () => {
      if (unlocked) return;
      unlocked = true;
      elonAudio.unlockAudio();
      if (soundEnabled) {
        elonAudio.startBackgroundMusic();
        setIsMusicPlaying(true);
      }
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      elonAudio.cleanup();
    };
  }, [soundEnabled]);

  return (
    <ElonGameAudioContext.Provider
      value={{
        soundEnabled,
        isMusicPlaying,
        toggleSound,
        playSound,
        speakLetter,
        speakWord,
        startMusic,
        stopMusic,
      }}
    >
      {children}
    </ElonGameAudioContext.Provider>
  );
};

export const useElonGameAudio = (): ElonGameAudioContextType => {
  const context = useContext(ElonGameAudioContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      soundEnabled: true,
      isMusicPlaying: false,
      toggleSound: () => {},
      playSound: () => {},
      speakLetter: () => {},
      speakWord: () => {},
      startMusic: () => {},
      stopMusic: () => {},
    };
  }
  return context;
};
