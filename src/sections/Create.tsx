import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const PIECES = [
  {
    label: "UI DESIGN",
    sub: "Interfaces",
    desktop: "md:absolute md:w-[34%] md:top-[0%] md:left-[2%] md:rotate-[-4deg]",
  },
  {
    label: "BRANDING",
    sub: "Identity",
    desktop: "md:absolute md:w-[26%] md:top-[8%] md:left-[58%] md:rotate-[3deg]",
  },
  {
    label: "LANDING PAGES",
    sub: "Marketing",
    desktop: "md:absolute md:w-[38%] md:top-[42%] md:left-[30%] md:rotate-[-2deg]",
  },
  {
    label: "MOTION",
    sub: "Animation",
    desktop: "md:absolute md:w-[22%] md:top-[58%] md:left-[2%] md:rotate-[5deg]",
  },
  {
    label: "VISUAL EXPERIMENTS",
    sub: "Exploration",
    desktop: "md:absolute md:w-[24%] md:top-[70%] md:left-[68%] md:rotate-[-3deg]",
  },
];

export function Create() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      gsap.utils.toArray<HTMLElement>(".create-piece").forEach((el, i) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        });
        if (!reduceMotion && isDesktop) {
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

        <div className="flex flex-col gap-5 md:relative md:block md:h-[720px] md:gap-0">
          {PIECES.map((p) => (
            <div
              key={p.label}
              className={`create-piece w-full aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-5 backdrop-blur-sm transition-transform duration-500 hover:border-[var(--color-signal)]/60 ${p.desktop}`}
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
