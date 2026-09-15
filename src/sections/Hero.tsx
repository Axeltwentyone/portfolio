import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const ORBIT_WORDS = [
  { label: "CODE", top: "18%", left: "8%", depth: 1.4 },
  { label: "DESIGN", top: "68%", left: "10%", depth: 0.8 },
  { label: "IDEAS", top: "14%", left: "82%", depth: 1.1 },
  { label: "WEB", top: "78%", left: "80%", depth: 1.6 },
  { label: "MOBILE", top: "45%", left: "4%", depth: 1.0 },
  { label: "AI", top: "40%", left: "90%", depth: 0.6 },
  { label: "MOTION", top: "88%", left: "42%", depth: 1.2 },
  { label: "BUILD", top: "6%", left: "45%", depth: 0.9 },
];

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-kicker", { autoAlpha: 0, y: 16, duration: 0.7 })
        .from(
          ".hero-name-line",
          { yPercent: 110, duration: 1, stagger: 0.08 },
          "-=0.3",
        )
        .to(lineRef.current, { scaleX: 1, duration: 1, ease: "power4.inOut" }, "-=0.6")
        .from(
          ".orbit-word",
          { autoAlpha: 0, scale: 0.6, duration: 0.6, stagger: 0.06 },
          "-=0.7",
        )
        .from(".hero-sub", { autoAlpha: 0, y: 12, duration: 0.6 }, "-=0.4")
        .from(".scroll-cue", { autoAlpha: 0, duration: 0.5 }, "-=0.2");

      if (!reduceMotion) {
        gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=90%",
            pin: true,
            scrub: 1,
          },
        })
          .to(".hero-fade-out", { autoAlpha: 0, y: -50, duration: 1, ease: "power1.in" }, 0)
          .fromTo(
            ".seventeen-word",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.25 },
            0.2,
          )
          .to(
            ".seventeen-word",
            {
              scrambleText: {
                text: "SEVENTEEN",
                chars: "upperCase",
                speed: 0.35,
                revealDelay: 0.1,
              },
              duration: 0.8,
              ease: "none",
            },
            0.2,
          )
          .to(".seventeen-word", { autoAlpha: 1, duration: 0.3 }, "-=0.1");
      }

      if (!reduceMotion) {
        const outers = gsap.utils.toArray<HTMLElement>(".orbit-word-outer");
        outers.forEach((el, i) => {
          const ampX = gsap.utils.random(10, 24);
          const ampY = gsap.utils.random(10, 24);
          gsap.to(el, {
            x: `+=${ampX}`,
            duration: gsap.utils.random(5, 9),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1 + i * 0.15,
          });
          gsap.to(el, {
            y: `+=${ampY}`,
            duration: gsap.utils.random(5, 9),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1 + i * 0.2,
          });
        });
      }

      const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (isFine && !reduceMotion) {
        const words = gsap.utils.toArray<HTMLElement>(".orbit-word");
        const movers = words.map((el) => {
          const depth = Number(el.dataset.depth ?? 1);
          return {
            el,
            x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
            depth,
          };
        });
        const onMove = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(nx * 30 * m.depth);
            m.y(ny * 30 * m.depth);
          });
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-24"
    >
      <div className="hero-fade-out relative z-10 flex w-full flex-col items-center">
        {ORBIT_WORDS.map((w) => (
          <span
            key={w.label}
            className="orbit-word-outer pointer-events-none absolute hidden select-none md:block"
            style={{ top: w.top, left: w.left }}
          >
            <span
              data-depth={w.depth}
              className="orbit-word inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50"
            >
              <span className="h-[3px] w-[3px] rounded-full bg-[var(--color-signal)]" />
              {w.label}
            </span>
          </span>
        ))}

        <p className="hero-kicker mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50 md:text-xs">
          Welcome to my world.
        </p>

        <h1 className="relative select-none text-center font-display leading-[0.85] text-[clamp(3.5rem,15vw,11rem)] font-semibold">
          <span className="block overflow-hidden">
            <span className="hero-name-line block">AXEL</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-name-line text-outline block">TEKY</span>
          </span>
        </h1>

        <div
          ref={lineRef}
          className="my-8 h-[3px] w-full max-w-3xl origin-left scale-x-0 bg-[var(--color-signal)] md:my-10"
        />

        <p className="hero-sub max-w-md text-center font-body text-sm text-white/60 md:text-base">
          Full-stack developer &amp; digital designer. I turn ideas into things people
          actually use.
        </p>
      </div>

      <div className="hero-fade-out scroll-cue absolute bottom-8 z-10 flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        <span>Scroll to explore</span>
        <span className="block h-10 w-px animate-pulse bg-white/30" />
      </div>

      <div
        aria-hidden="true"
        className="seventeen-word pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center text-center font-display text-[clamp(2.5rem,12vw,9rem)] font-semibold uppercase tracking-tight text-[var(--color-signal)] opacity-0"
      >
        AXEL TEKY
      </div>
    </section>
  );
}
