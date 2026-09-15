import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { experiments } from "../data/experiments";

export function Experiments() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".exp-card", {
        autoAlpha: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-grid",
          start: "top 82%",
        },
      });
    },
    { scope: root },
  );

  return (
    <section id="experiments" ref={root} className="relative border-y border-white/10 bg-white/[0.02] px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-4 md:mb-20">
          <span className="font-mono text-xs text-[var(--color-signal)]">05</span>
          <span className="h-px flex-1 bg-white/15" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            Experiments
          </span>
        </div>

        <h2 className="mb-16 max-w-xl font-display text-[clamp(1.75rem,5vw,3.25rem)] font-medium leading-tight md:mb-20">
          A digital lab for things I build just to see if they work.
        </h2>

        <div className="exp-grid grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              data-cursor="+"
              className="exp-card group relative overflow-hidden rounded-xl border border-white/10 p-6 transition-colors hover:border-[var(--color-signal)]/50"
            >
              <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/40">
                <span>{exp.id}</span>
                <span className="text-[var(--color-signal)]">{exp.type}</span>
              </div>
              <h3 className="mb-3 font-display text-xl font-medium md:text-2xl">{exp.title}</h3>
              <p className="font-body text-sm text-white/50">{exp.note}</p>
              <span className="absolute -bottom-6 -right-4 select-none font-display text-[7rem] font-semibold leading-none text-white/[0.03] transition-colors group-hover:text-[var(--color-signal)]/10">
                {exp.id.slice(-2)}
              </span>
            </div>
          ))}

          <div className="exp-card flex flex-col justify-center rounded-xl border border-dashed border-white/15 p-6 text-white/40">
            <p className="font-mono text-[10px] uppercase tracking-widest">Next up</p>
            <p className="mt-2 font-display text-lg">More on the way.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
