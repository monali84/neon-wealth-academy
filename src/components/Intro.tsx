import { useEffect, useRef, useState } from "react";

function getCtx(): AudioContext | null {
  try {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    return new Ctx();
  } catch {
    return null;
  }
}

function beep(ctx: AudioContext, freq: number, duration = 0.18, vol = 0.25) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(vol, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration + 0.02);
}

// Rocket launch: low rumble (filtered noise) that grows + sub bass sweep
function rocketLaunchSound(ctx: AudioContext, totalSec = 3.2) {
  const t0 = ctx.currentTime;

  // Noise buffer
  const bufferSize = ctx.sampleRate * totalSec;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(180, t0);
  lp.frequency.linearRampToValueAtTime(900, t0 + totalSec);
  lp.Q.value = 1.2;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.05, t0);
  noiseGain.gain.linearRampToValueAtTime(0.55, t0 + 0.6);
  noiseGain.gain.linearRampToValueAtTime(0.85, t0 + totalSec - 0.4);
  noiseGain.gain.linearRampToValueAtTime(0.0001, t0 + totalSec);

  noise.connect(lp).connect(noiseGain).connect(ctx.destination);
  noise.start(t0);
  noise.stop(t0 + totalSec);

  // Sub bass sweep
  const sub = ctx.createOscillator();
  sub.type = "sawtooth";
  sub.frequency.setValueAtTime(35, t0);
  sub.frequency.exponentialRampToValueAtTime(110, t0 + totalSec);

  const subGain = ctx.createGain();
  subGain.gain.setValueAtTime(0.0001, t0);
  subGain.gain.linearRampToValueAtTime(0.35, t0 + 0.7);
  subGain.gain.linearRampToValueAtTime(0.5, t0 + totalSec - 0.4);
  subGain.gain.exponentialRampToValueAtTime(0.0001, t0 + totalSec);

  sub.connect(subGain).connect(ctx.destination);
  sub.start(t0);
  sub.stop(t0 + totalSec);
}

type Phase = "3" | "2" | "1" | "quote" | "launch" | "liftoff" | "done";

export default function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("3");
  const [fadeOut, setFadeOut] = useState(false);
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const ctx = getCtx();
    ctxRef.current = ctx;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    if (ctx) beep(ctx, 660);
    schedule(900, () => { setPhase("2"); ctx && beep(ctx, 740); });
    schedule(1800, () => { setPhase("1"); ctx && beep(ctx, 820); });
    schedule(2700, () => setPhase("quote"));
    schedule(5400, () => {
      setPhase("launch");
      setFlash(true);
      if (ctx) rocketLaunchSound(ctx, 3.2);
      setTimeout(() => setFlash(false), 250);
    });
    // small pause then liftoff
    schedule(5900, () => { setPhase("liftoff"); setShake(true); });
    schedule(8200, () => { setShake(false); setFadeOut(true); });
    schedule(9000, () => { setPhase("done"); onDone(); ctx?.close().catch(() => {}); });

    return () => {
      timers.forEach(clearTimeout);
      ctx?.close().catch(() => {});
    };
  }, [onDone]);

  if (phase === "done") return null;

  const particles = Array.from({ length: 40 });
  const sparks = Array.from({ length: 18 });
  const smokes = Array.from({ length: 8 });

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-background transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"} ${shake ? "animate-[introShake_0.08s_linear_infinite]" : ""}`}
      aria-hidden="true"
    >
      {/* Bg fade during liftoff */}
      <div
        className={`absolute inset-0 bg-background transition-opacity duration-[1500ms] ${phase === "liftoff" ? "opacity-70" : "opacity-0"}`}
      />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((_, i) => {
          const left = (i * 37) % 100;
          const top = (i * 53) % 100;
          const delay = (i % 10) * 0.3;
          const size = 2 + (i % 4);
          const gold = i % 2 === 0;
          return (
            <span
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                background: gold ? "oklch(0.85 0.18 90)" : "oklch(0.85 0.22 145)",
                boxShadow: gold
                  ? "0 0 10px oklch(0.85 0.18 90 / 0.9)"
                  : "0 0 10px oklch(0.85 0.22 145 / 0.9)",
                animationDelay: `${delay}s`,
                opacity: 0.7,
              }}
            />
          );
        })}
      </div>

      {/* Glows */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vmin] w-[60vmin] rounded-full bg-neon-green/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40vmin] w-[40vmin] rounded-full bg-neon-yellow/20 blur-3xl" />

      {/* Ignition flash */}
      {flash && <div className="absolute inset-0 bg-white/70 animate-[introFlash_0.25s_ease-out_forwards]" />}

      {/* Center text */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        {(phase === "3" || phase === "2" || phase === "1") && (
          <div
            key={phase}
            className="font-display font-black text-neon-green animate-[introCount_0.9s_ease-out_forwards]"
            style={{
              fontSize: "clamp(8rem, 35vw, 22rem)",
              lineHeight: 1,
              textShadow: "0 0 40px oklch(0.85 0.22 145 / 0.9), 0 0 90px oklch(0.85 0.22 145 / 0.6)",
            }}
          >
            {phase}
          </div>
        )}

        {phase === "quote" && (
          <blockquote
            className="max-w-3xl font-display font-bold animate-[introFade_0.9s_ease-out_forwards]"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", lineHeight: 1.2 }}
          >
            <span className="text-neon-yellow" style={{ textShadow: "0 0 30px oklch(0.88 0.19 95 / 0.8)" }}>
              “Investment in knowledge pays the best interest.”
            </span>
            <footer className="mt-6 text-base font-medium text-muted-foreground sm:text-lg">— Benjamin Franklin</footer>
          </blockquote>
        )}

        {(phase === "launch" || phase === "liftoff") && (
          <div
            className="font-display font-black animate-[introLaunch_1s_ease-out_forwards]"
            style={{
              fontSize: "clamp(5rem, 18vw, 14rem)",
              lineHeight: 1,
              color: "oklch(0.85 0.22 145)",
              textShadow: "0 0 50px oklch(0.85 0.22 145 / 1), 0 0 120px oklch(0.85 0.18 90 / 0.7)",
            }}
          >
            LAUNCH 🚀
          </div>
        )}
      </div>

      {/* Rocket + smoke layer */}
      {(phase === "launch" || phase === "liftoff") && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
          {/* Smoke clouds at base */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] max-w-[90vw] h-[200px]">
            {smokes.map((_, i) => {
              const offset = (i - smokes.length / 2) * 60;
              const delay = (i % 4) * 0.1;
              return (
                <span
                  key={i}
                  className="absolute bottom-0 rounded-full bg-white/30 blur-2xl animate-[introSmoke_2.4s_ease-out_forwards]"
                  style={{
                    left: `calc(50% + ${offset}px)`,
                    width: 180,
                    height: 180,
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            })}
          </div>

          {/* Sparks */}
          {phase === "liftoff" &&
            sparks.map((_, i) => {
              const x = (i - sparks.length / 2) * 14;
              const delay = (i % 6) * 0.05;
              return (
                <span
                  key={i}
                  className="absolute bottom-10 rounded-full bg-neon-yellow animate-[introSpark_1.2s_ease-out_forwards]"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    width: 4,
                    height: 4,
                    boxShadow: "0 0 12px oklch(0.88 0.19 95 / 1)",
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            })}

          {/* Rocket */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 ${phase === "liftoff" ? "animate-[introRocket_2.2s_cubic-bezier(0.55,0,0.7,0.2)_forwards]" : "animate-[introRocketIdle_0.5s_ease-out_forwards]"}`}
            style={{ bottom: "-20px" }}
          >
            {/* Exhaust flame */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full w-10 origin-top animate-[introFlame_0.18s_ease-in-out_infinite_alternate]"
              style={{
                height: phase === "liftoff" ? 220 : 110,
                background:
                  "linear-gradient(to bottom, oklch(0.95 0.2 90) 0%, oklch(0.85 0.22 60) 30%, oklch(0.7 0.25 30) 70%, transparent 100%)",
                borderRadius: "50% 50% 30% 30% / 30% 30% 60% 60%",
                filter: "blur(2px)",
                boxShadow: "0 0 60px oklch(0.85 0.22 60 / 0.9), 0 0 120px oklch(0.85 0.18 90 / 0.7)",
              }}
            />
            {/* Rocket SVG */}
            <svg width="90" height="170" viewBox="0 0 90 170" className="relative drop-shadow-[0_0_30px_oklch(0.85_0.22_145/0.6)]">
              <defs>
                <linearGradient id="body" x1="0" x2="1">
                  <stop offset="0" stopColor="#f4f4f5" />
                  <stop offset="0.5" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#a1a1aa" />
                </linearGradient>
              </defs>
              {/* Nose */}
              <path d="M45 0 L70 55 L20 55 Z" fill="oklch(0.7 0.25 25)" />
              {/* Body */}
              <rect x="20" y="55" width="50" height="80" fill="url(#body)" />
              {/* Window */}
              <circle cx="45" cy="85" r="10" fill="oklch(0.7 0.18 230)" stroke="#52525b" strokeWidth="3" />
              {/* Fins */}
              <path d="M20 110 L5 145 L20 140 Z" fill="oklch(0.7 0.25 25)" />
              <path d="M70 110 L85 145 L70 140 Z" fill="oklch(0.7 0.25 25)" />
              {/* Bottom */}
              <rect x="22" y="135" width="46" height="10" fill="#52525b" />
            </svg>
          </div>
        </div>
      )}

      <style>{`
        @keyframes introCount {
          0% { transform: scale(0.4); opacity: 0; }
          40% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes introFade {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes introLaunch {
          0% { transform: scale(0.5); opacity: 0; filter: blur(8px); }
          50% { transform: scale(1.15); opacity: 1; filter: blur(0); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes introFlash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes introShake {
          0% { transform: translate(0,0); }
          25% { transform: translate(-3px, 2px); }
          50% { transform: translate(2px, -2px); }
          75% { transform: translate(-2px, -3px); }
          100% { transform: translate(3px, 1px); }
        }
        @keyframes introRocketIdle {
          0% { transform: translateX(-50%) translateY(40px); opacity: 0; }
          100% { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes introRocket {
          0% { transform: translateX(-50%) translateY(0); filter: blur(0); }
          15% { transform: translateX(-50%) translateY(-40px); filter: blur(0); }
          100% { transform: translateX(-50%) translateY(-130vh); filter: blur(6px); }
        }
        @keyframes introFlame {
          0% { transform: translateX(-50%) scaleY(0.85); opacity: 0.85; }
          100% { transform: translateX(-50%) scaleY(1.15); opacity: 1; }
        }
        @keyframes introSmoke {
          0% { transform: scale(0.3) translateY(0); opacity: 0; }
          30% { opacity: 0.7; }
          100% { transform: scale(2) translateY(-40px); opacity: 0; }
        }
        @keyframes introSpark {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(120px) scale(0.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
