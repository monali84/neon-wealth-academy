import { useEffect, useState } from "react";

function beep(freq: number, duration = 0.18) {
  try {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
    setTimeout(() => ctx.close(), (duration + 0.1) * 1000);
  } catch {}
}

type Phase = "3" | "2" | "1" | "quote" | "launch" | "done";

export default function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("3");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    beep(660);
    schedule(900, () => { setPhase("2"); beep(740); });
    schedule(1800, () => { setPhase("1"); beep(820); });
    schedule(2700, () => { setPhase("quote"); });
    schedule(5400, () => { setPhase("launch"); beep(1200, 0.4); });
    schedule(6800, () => setFadeOut(true));
    schedule(7500, () => { setPhase("done"); onDone(); });

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  if (phase === "done") return null;

  // generate particles once
  const particles = Array.from({ length: 40 });

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"}`}
      aria-hidden="true"
    >
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
      <div className="absolute h-[60vmin] w-[60vmin] rounded-full bg-neon-green/20 blur-3xl" />
      <div className="absolute h-[40vmin] w-[40vmin] rounded-full bg-neon-yellow/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-6 text-center">
        {(phase === "3" || phase === "2" || phase === "1") && (
          <div
            key={phase}
            className="font-display font-black text-neon-green animate-[introCount_0.9s_ease-out_forwards]"
            style={{
              fontSize: "clamp(8rem, 35vw, 22rem)",
              lineHeight: 1,
              textShadow:
                "0 0 40px oklch(0.85 0.22 145 / 0.9), 0 0 90px oklch(0.85 0.22 145 / 0.6)",
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
            <span
              className="text-neon-yellow"
              style={{ textShadow: "0 0 30px oklch(0.88 0.19 95 / 0.8)" }}
            >
              “Investment in knowledge pays the best interest.”
            </span>
            <footer className="mt-6 text-base font-medium text-muted-foreground sm:text-lg">
              — Benjamin Franklin
            </footer>
          </blockquote>
        )}

        {phase === "launch" && (
          <div
            className="font-display font-black animate-[introLaunch_1.2s_ease-out_forwards]"
            style={{
              fontSize: "clamp(5rem, 18vw, 14rem)",
              lineHeight: 1,
              color: "oklch(0.85 0.22 145)",
              textShadow:
                "0 0 50px oklch(0.85 0.22 145 / 1), 0 0 120px oklch(0.85 0.18 90 / 0.7)",
            }}
          >
            LAUNCH 🚀
          </div>
        )}
      </div>

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
          40% { transform: scale(1.15); opacity: 1; filter: blur(0); }
          70% { transform: scale(1); }
          100% { transform: scale(1.05); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
