import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const LINES = ["I BUILD THINGS.", "I BREAK THINGS.", "I FIX THEM.", "I TRY AGAIN."];

export function Personality() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>(".pers-line");
      gsap.set(lines, { autoAlpha: 0.1 });
      lines.forEach((line) => {
        gsap.to(line, {
          autoAlpha: 1,
          duration: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 65%",
            end: "top 35%",
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        ".flow-track",
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden px-6 py-28 md:py-40">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 md:gap-6">
        {LINES.map((line) => (
          <h3
            key={line}
            className="pers-line font-display text-[clamp(2rem,7vw,4.5rem)] font-semibold leading-none"
          >
            {line}
          </h3>
        ))}
      </div>

      <div className="mt-24 overflow-hidden whitespace-nowrap md:mt-32">
        <div className="flow-track inline-flex gap-8 font-display text-3xl font-medium text-white/15 md:text-5xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-8">
              IDEA
              <span className="text-[var(--color-signal)]">→</span>
              DESIGN
              <span className="text-[var(--color-signal)]">→</span>
              CODE
              <span className="text-[var(--color-signal)]">→</span>
              REALITY
              <span className="mx-4 text-white/10">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
