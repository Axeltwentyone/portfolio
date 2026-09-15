import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { stack } from "../data/stack";

export function TechStack() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".spine", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".spine-wrap", start: "top 75%" },
      });
      gsap.utils.toArray<HTMLElement>(".stack-group").forEach((el, i) => {
        gsap.from(el, {
          autoAlpha: 0,
          x: i % 2 === 0 ? -40 : 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="stack" ref={root} className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 flex items-center gap-4 md:mb-24">
          <span className="font-mono text-xs text-[var(--color-signal)]">06</span>
          <span className="h-px flex-1 bg-white/15" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            Ecosystem
          </span>
        </div>

        <div className="spine-wrap relative mx-auto flex max-w-2xl flex-col gap-16">
          <div className="spine absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[var(--color-signal)] md:block" />

          {stack.map((group, i) => (
            <div
              key={group.label}
              className={`stack-group relative flex flex-col gap-3 md:w-[46%] ${
                i % 2 === 0 ? "md:mr-auto md:items-end md:text-right" : "md:ml-auto"
              }`}
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-signal)]">
                {group.label}
              </span>
              <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 px-4 py-2 font-body text-sm text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
