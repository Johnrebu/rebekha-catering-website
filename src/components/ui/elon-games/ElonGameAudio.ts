/**
 * Elon Games Audio Engine
 * Lightweight Web Audio synthesizer for kid-friendly sound effects & procedural background music
 * + SpeechSynthesis API wrapper for educational phonetic pronunciations.
 */

export type SoundEffectType =
  | "pop"
  | "correct"
  | "wrong"
  | "click"
  | "cardFlip"
  | "star"
  | "celebration"
  | "fanfare"
  | "splash"
  | "levelComplete";

class ElonGameAudioEngine {
  private ctx: AudioContext | null = null;
  private musicInterval: number | null = null;
  private musicGainNode: GainNode | null = null;
  private masterGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private currentSpeech: SpeechSynthesisUtterance | null = null;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        
        // Master gain
        this.masterGainNode = this.ctx.createGain();
        this.masterGainNode.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
        this.masterGainNode.connect(this.ctx.destination);

        // SFX gain
        this.sfxGainNode = this.ctx.createGain();
        this.sfxGainNode.gain.setValueAtTime(0.5, this.ctx.currentTime);
        this.sfxGainNode.connect(this.masterGainNode);

        // Music gain (kept low so sfx are clear)
        this.musicGainNode = this.ctx.createGain();
        this.musicGainNode.gain.setValueAtTime(0.12, this.ctx.currentTime);
        this.musicGainNode.connect(this.masterGainNode);
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  /**
   * Unlock AudioContext upon user gesture
   */
  public unlockAudio(): void {
    const ctx = this.initContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
  }

  /**
   * Set mute state
   */
  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setTargetAtTime(muted ? 0 : 1, this.ctx.currentTime, 0.05);
    }
    if (muted && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Play synthesized kid-friendly sound effects
   */
  public playEffect(type: SoundEffectType): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx || !this.sfxGainNode) return;

    const now = ctx.currentTime;

    switch (type) {
      case "pop": {
        // Soft balloon / bubble pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.09);

        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(now);
        osc.stop(now + 0.09);
        break;
      }

      case "correct": {
        // Cheerful major triad (C5 - E5 - G5)
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);

          gain.gain.setValueAtTime(0.35, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.22);

          osc.connect(gain);
          gain.connect(this.sfxGainNode!);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.22);
        });
        break;
      }

      case "wrong": {
        // Gentle "try again" low double tone (not harsh)
        const notes = [260, 220];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);

          gain.gain.setValueAtTime(0.25, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.16);

          osc.connect(gain);
          gain.connect(this.sfxGainNode!);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.16);
        });
        break;
      }

      case "click": {
        // Soft button tap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(now);
        osc.stop(now + 0.03);
        break;
      }

      case "cardFlip": {
        // Soft card flip whoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.06);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }

      case "star": {
        // Shimmering high star sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.18);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }

      case "celebration":
      case "fanfare":
      case "levelComplete": {
        // Cheerful reward melody: C5 - E5 - G5 - C6
        const fanfareNotes = [523.25, 659.25, 783.99, 1046.5];
        fanfareNotes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.11);

          const dur = idx === fanfareNotes.length - 1 ? 0.45 : 0.2;
          gain.gain.setValueAtTime(0.38, now + idx * 0.11);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.11 + dur);

          osc.connect(gain);
          gain.connect(this.sfxGainNode!);
          osc.start(now + idx * 0.11);
          osc.stop(now + idx * 0.11 + dur);
        });
        break;
      }

      case "splash": {
        // Water / paint splash effect
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.12);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }
    }
  }

  /**
   * Gentle, cheerful, procedural background music for children
   * Plays soft, playful pentatonic chords with a smooth filter and short seamless progression
   */
  public startBackgroundMusic(): void {
    if (this.isMusicPlaying) return;
    const ctx = this.initContext();
    if (!ctx || !this.musicGainNode) return;

    this.isMusicPlaying = true;

    // Peaceful, pleasant 8-step pentatonic melody loop in C major
    // C4, E4, G4, A4, C5, G4, E4, D4
    const melody = [261.63, 329.63, 392.0, 440.0, 523.25, 392.0, 329.63, 293.66];
    let step = 0;

    const playNote = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGainNode || this.isMuted) return;

      const now = this.ctx.currentTime;
      const freq = melody[step % melody.length];
      step++;

      // Soft tone oscillator
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, now);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      // Gentle attack and decay
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.08, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.musicGainNode);

      osc.start(now);
      osc.stop(now + 0.48);
    };

    // Trigger notes every 480ms for a calm, cheerful rhythm
    this.musicInterval = window.setInterval(playNote, 480);
  }

  public stopBackgroundMusic(): void {
    this.isMusicPlaying = false;
    if (this.musicInterval !== null) {
      window.clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public isMusicActive(): boolean {
    return this.isMusicPlaying;
  }

  /**
   * Pronounce a letter clearly for children using SpeechSynthesis API
   */
  public speakLetter(letter: string, wordExample?: string): void {
    if (this.isMuted) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      // Graceful fallback to a cute chime if SpeechSynthesis is unavailable
      this.playEffect("pop");
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Cancel any previous speech

      const text = wordExample ? `${letter}, ${wordExample}` : letter;
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.rate = 0.85; // Slightly slower for clarity
      utterance.pitch = 1.25; // Friendly, cheerful tone for children
      utterance.volume = 1.0;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(
        (v) => (v.lang.startsWith("en") || v.lang.includes("US") || v.lang.includes("GB")) && (v.name.includes("Female") || v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha"))
      ) || voices.find((v) => v.lang.startsWith("en"));

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      this.currentSpeech = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Graceful fallback on error
      this.playEffect("pop");
    }
  }

  /**
   * Pronounce a full word (e.g., "Apple", "Blue", "Circle")
   */
  public speakWord(word: string): void {
    if (this.isMuted) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      this.playEffect("click");
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find((v) => v.lang.startsWith("en"));
      if (englishVoice) utterance.voice = englishVoice;

      window.speechSynthesis.speak(utterance);
    } catch {
      this.playEffect("click");
    }
  }

  /**
   * Full cleanup on unmount / navigation away
   */
  public cleanup(): void {
    this.stopBackgroundMusic();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (this.ctx && this.ctx.state !== "closed") {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}

export const elonAudio = new ElonGameAudioEngine();
