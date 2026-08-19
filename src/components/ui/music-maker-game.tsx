import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";

/* ─── sound generation via Web Audio API ─── */
const audioCtxRef: { current: AudioContext | null } = { current: null };

function getAudioCtx(): AudioContext {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtxRef.current;
}

function playTone(freq: number, duration = 0.3, type: OscillatorType = "sine") {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function playDrum(type: "kick" | "snare" | "hihat") {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const noise = ctx.createBufferSource();

  if (type === "kick") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } else if (type === "snare" || type === "hihat") {
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(type === "snare" ? 0.3 : 0.15, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (type === "snare" ? 0.15 : 0.05));
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start();
  }
}

/* ─── pad definitions ─── */
interface Pad {
  id: string;
  label: string;
  emoji: string;
  color: string;
  action: () => void;
}

const NOTES: Pad[] = [
  { id: "c", label: "Do", emoji: "🎵", color: "#ef4444", action: () => playTone(261.63) },
  { id: "d", label: "Re", emoji: "🎵", color: "#f97316", action: () => playTone(293.66) },
  { id: "e", label: "Mi", emoji: "🎵", color: "#eab308", action: () => playTone(329.63) },
  { id: "f", label: "Fa", emoji: "🎵", color: "#22c55e", action: () => playTone(349.23) },
  { id: "g", label: "Sol", emoji: "🎵", color: "#3b82f6", action: () => playTone(392.0) },
  { id: "a", label: "La", emoji: "🎵", color: "#8b5cf6", action: () => playTone(440.0) },
  { id: "b", label: "Ti", emoji: "🎵", color: "#ec4899", action: () => playTone(493.88) },
  { id: "c2", label: "Do!", emoji: "🎵", color: "#f43f5e", action: () => playTone(523.25) },
];

const ANIMALS: Pad[] = [
  { id: "cat", label: "Cat", emoji: "🐱", color: "#f97316", action: () => playTone(800, 0.3, "sawtooth") },
  { id: "dog", label: "Dog", emoji: "🐶", color: "#a16207", action: () => playTone(200, 0.4, "square") },
  { id: "bird", label: "Bird", emoji: "🐦", color: "#22d3ee", action: () => { playTone(1200, 0.1); setTimeout(() => playTone(1400, 0.1), 120); } },
  { id: "frog", label: "Frog", emoji: "🐸", color: "#22c55e", action: () => { playTone(250, 0.1, "square"); setTimeout(() => playTone(350, 0.15, "square"), 100); } },
  { id: "cow", label: "Cow", emoji: "🐮", color: "#854d0e", action: () => playTone(150, 0.6, "sawtooth") },
  { id: "duck", label: "Duck", emoji: "🦆", color: "#eab308", action: () => { playTone(500, 0.15, "square"); setTimeout(() => playTone(480, 0.15, "square"), 150); } },
  { id: "lion", label: "Lion", emoji: "🦁", color: "#dc2626", action: () => playTone(100, 0.5, "sawtooth") },
  { id: "mouse", label: "Mouse", emoji: "🐭", color: "#d1d5db", action: () => playTone(1600, 0.15, "sine") },
];

const DRUMS: Pad[] = [
  { id: "kick1", label: "Boom", emoji: "🥁", color: "#dc2626", action: () => playDrum("kick") },
  { id: "snare1", label: "Snap", emoji: "🪘", color: "#f97316", action: () => playDrum("snare") },
  { id: "hihat1", label: "Tss", emoji: "🔔", color: "#eab308", action: () => playDrum("hihat") },
  { id: "kick2", label: "Boom", emoji: "🥁", color: "#22c55e", action: () => playDrum("kick") },
  { id: "low", label: "Low", emoji: "📯", color: "#3b82f6", action: () => playTone(110, 0.3, "triangle") },
  { id: "mid", label: "Mid", emoji: "🎺", color: "#8b5cf6", action: () => playTone(330, 0.2, "triangle") },
  { id: "high", label: "High", emoji: "🔊", color: "#ec4899", action: () => playTone(660, 0.15, "triangle") },
  { id: "snare2", label: "Snap", emoji: "🪘", color: "#f43f5e", action: () => playDrum("snare") },
];

const CATEGORIES = [
  { id: "notes", label: "🎹 Music", pads: NOTES },
  { id: "animals", label: "🐾 Animals", pads: ANIMALS },
  { id: "drums", label: "🥁 Drums", pads: DRUMS },
];

/* ─── main ─── */
export default function MusicMakerGame() {
  const [category, setCategory] = useState("notes");
  const [activePad, setActivePad] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState<{ id: string; time: number }[]>([]);
  const [playing, setPlaying] = useState(false);
  const startTimeRef = useRef(0);

  const currentPads = CATEGORIES.find((c) => c.id === category)?.pads ?? NOTES;

  const handlePadPress = useCallback(
    (pad: Pad) => {
      pad.action();
      setActivePad(pad.id);
      setTimeout(() => setActivePad(null), 200);

      if (recording) {
        setRecorded((prev) => [
          ...prev,
          { id: pad.id, time: Date.now() - startTimeRef.current },
        ]);
      }
    },
    [recording]
  );

  const startRecording = useCallback(() => {
    setRecorded([]);
    startTimeRef.current = Date.now();
    setRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    setRecording(false);
  }, []);

  const playRecording = useCallback(() => {
    if (recorded.length === 0 || playing) return;
    setPlaying(true);

    recorded.forEach(({ id, time }) => {
      setTimeout(() => {
        const pad = currentPads.find((p) => p.id === id);
        if (pad) {
          pad.action();
          setActivePad(id);
          setTimeout(() => setActivePad(null), 200);
        }
      }, time);
    });

    const lastTime = recorded[recorded.length - 1]?.time ?? 0;
    setTimeout(() => setPlaying(false), lastTime + 500);
  }, [recorded, currentPads, playing]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-fuchsia-950 via-purple-950 to-violet-950 flex flex-col items-center overflow-auto">
      {/* Header */}
      <div className="w-full max-w-lg px-4 pt-6 z-10">
        <h2 className="text-3xl font-black text-white text-center mb-1">
          🥁 Music Maker
        </h2>
        <p className="text-purple-300/60 text-sm text-center mb-4">
          Tap the pads to make music!
        </p>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat.id
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/5 text-white/50 border border-transparent hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pads grid */}
      <div className="flex-1 flex items-center justify-center px-4 z-10">
        <div className="grid grid-cols-4 gap-3 max-w-md w-full">
          {currentPads.map((pad) => (
            <motion.button
              key={pad.id}
              onClick={() => handlePadPress(pad)}
              className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all active:scale-95"
              style={{
                backgroundColor:
                  activePad === pad.id ? pad.color + "40" : pad.color + "15",
                borderColor:
                  activePad === pad.id ? pad.color : pad.color + "30",
                boxShadow:
                  activePad === pad.id
                    ? `0 0 25px ${pad.color}40`
                    : "none",
              }}
              animate={
                activePad === pad.id
                  ? { scale: [1, 0.92, 1] }
                  : {}
              }
              transition={{ duration: 0.15 }}
            >
              <span className="text-3xl">{pad.emoji}</span>
              <span
                className="text-xs font-bold"
                style={{ color: pad.color }}
              >
                {pad.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recording controls */}
      <div className="w-full max-w-lg px-4 py-6 z-10">
        <div className="flex justify-center gap-3">
          {!recording ? (
            <button
              onClick={startRecording}
              className="px-6 py-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 font-medium text-sm hover:bg-red-500/30 transition-all flex items-center gap-2"
            >
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              Record
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-6 py-3 rounded-xl bg-red-500/30 border border-red-400/50 text-red-200 font-medium text-sm hover:bg-red-500/40 transition-all flex items-center gap-2"
            >
              <span className="w-3 h-3 rounded-sm bg-red-400" />
              Stop
            </button>
          )}

          {recorded.length > 0 && !recording && (
            <button
              onClick={playRecording}
              disabled={playing}
              className={`px-6 py-3 rounded-xl border font-medium text-sm transition-all flex items-center gap-2 ${
                playing
                  ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-300"
                  : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15"
              }`}
            >
              {playing ? "🎶 Playing..." : "▶️ Play Back"}
            </button>
          )}

          {recorded.length > 0 && !recording && (
            <button
              onClick={() => setRecorded([])}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/40 text-sm hover:bg-white/10 transition-all"
            >
              🗑️
            </button>
          )}
        </div>

        {recording && (
          <p className="text-center text-red-400/60 text-xs mt-2 animate-pulse">
            🔴 Recording... tap pads to create your song!
          </p>
        )}
      </div>
    </div>
  );
}
