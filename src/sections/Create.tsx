import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const PIECES = [
  { label: "UI DESIGN", sub: "Interfaces", rotate: -4, size: "w-[52%] md:w-[34%]", top: "0%", left: "2%" },
  { label: "BRANDING", sub: "Identity", rotate: 3, size: "w-[42%] md:w-[26%]", top: "8%", left: "58%" },
  { label: "LANDING PAGES", sub: "Marketing", rotate: -2, size: "w-[58%] md:w-[38%]", top: "42%", left: "30%" },
  { label: "MOTION", sub: "Animation", rotate: 5, size: "w-[38%] md:w-[22%]", top: "58%", left: "2%" },
  { label: "VISUAL EXPERIMENTS", sub: "Exploration", rotate: -3, size: "w-[44%] md:w-[24%]", top: "70%", left: "68%" },
];

export function Create() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.utils.toArray<HTMLElement>(".create-piece").forEach((el, i) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 60,
          rotate: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        });
        if (!reduceMotion) {
          gsap.to(el, {
            y: "+=14",
            duration: 3 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });
    },
    { scope: root },
  );

  return (
    <section id="create" ref={root} className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-4 md:mb-20">
          <span className="font-mono text-xs text-[var(--color-signal)]">03</span>
          <span className="h-px flex-1 bg-white/15" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            Create
          </span>
        </div>

        <h2 className="mb-16 max-w-2xl font-display text-[clamp(1.75rem,5vw,3.25rem)] font-medium leading-tight md:mb-24">
          Code is only half of it. The other half is making it{" "}
          <span className="text-[var(--color-signal)]">look</span> and{" "}
          <span className="text-[var(--color-signal)]">feel</span> right.
        </h2>

        <div className="relative h-[900px] md:h-[720px]">
          {PIECES.map((p) => (
            <div
              key={p.label}
              className={`create-piece absolute ${p.size} aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-5 backdrop-blur-sm transition-transform duration-500 hover:border-[var(--color-signal)]/60`}
              style={{ top: p.top, left: p.left, rotate: `${p.rotate}deg` }}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-[var(--color-signal)]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {p.sub}
                  </p>
                  <p className="font-display text-lg font-medium md:text-xl">{p.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
