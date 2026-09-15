import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { ScrubText } from "../components/ScrubText";

const IDEAS = ["PRODUCT", "DESIGN", "FRONTEND", "BACKEND", "MOBILE", "EXPERIMENTS"];

export function Think() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".idea-chip", {
        autoAlpha: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".idea-row",
          start: "top 80%",
        },
      });
    },
    { scope: root },
  );

  return (
    <section id="think" ref={root} className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 flex items-center gap-4 md:mb-24">
          <span className="font-mono text-xs text-[var(--color-signal)]">02</span>
          <span className="h-px flex-1 bg-white/15" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            Think
          </span>
        </div>

        <ScrubText
          text="I like turning ideas into things people can actually use."
          className="font-display text-[clamp(1.75rem,5.5vw,4rem)] font-medium leading-[1.05] text-white/90"
        />

        <div className="idea-row mt-20 flex flex-wrap gap-3 md:mt-28 md:gap-4">
          {IDEAS.map((idea) => (
            <span
              key={idea}
              className="idea-chip rounded-full border border-white/15 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-white/70 transition-colors hover:border-[var(--color-signal)] hover:text-white md:text-sm"
            >
              {idea}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
