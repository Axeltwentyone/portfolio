import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const FRAGMENTS = [
  { label: "LOCATION", value: "Abidjan, Côte d'Ivoire" },
  { label: "ROLE", value: "Full-Stack Developer & Digital Designer" },
  { label: "TECH", value: "React · Laravel · Flutter" },
  { label: "CURRENTLY", value: "Building Shoptongba" },
];

export function About() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-frag", {
        autoAlpha: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-frags", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 flex items-center gap-4 md:mb-24">
          <span className="font-mono text-xs text-[var(--color-signal)]">07</span>
          <span className="h-px flex-1 bg-white/15" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            About
          </span>
        </div>

        <h2 className="mb-10 font-display text-[clamp(2rem,7vw,4.5rem)] font-semibold leading-[0.95] md:mb-14">
          I'm Axel.
        </h2>

        <p className="max-w-2xl font-body text-lg leading-relaxed text-white/70 md:text-2xl md:leading-relaxed">
          I design things, build things, and sometimes break things just to
          understand how they work. I'm a developer and digital designer{" "}
          <span className="text-white">obsessed with turning ideas into experiences</span>{" "}
          — not just products.
        </p>

        <div className="about-frags mt-20 grid grid-cols-1 gap-6 border-t border-white/10 pt-10 sm:grid-cols-2 md:mt-28 md:gap-10">
          {FRAGMENTS.map((f) => (
            <div key={f.label} className="about-frag">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
                {f.label}
              </p>
              <p className="font-display text-lg text-white/90 md:text-xl">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
