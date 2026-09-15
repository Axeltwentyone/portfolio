import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const LINKS = [
  { label: "WORK", href: "#work" },
  { label: "EXPERIMENTS", href: "#experiments" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export function Nav() {
  const barRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });
    return () => st.kill();
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--color-ink)] via-[var(--color-ink)]/70 to-transparent md:h-28" />
      <div className="relative flex items-center justify-between px-5 py-5 md:px-10 md:py-7">
        <a
          href="#top"
          data-cursor="+"
          className="font-display text-sm font-semibold tracking-tight md:text-base"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#top");
          }}
        >
          AXEL TEKY
        </a>

        <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.15em] text-white/70 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="OPEN"
              className="group relative"
              onClick={(e) => {
                e.preventDefault();
                handleClick(l.href);
              }}
            >
              <span className="transition-colors group-hover:text-white">{l.label}</span>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-signal)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          data-cursor="+"
          className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div className="h-px w-full bg-white/10">
        <div
          ref={barRef}
          className="h-px w-full origin-left scale-x-0 bg-[var(--color-signal)]"
        />
      </div>

      <div
        className={`fixed inset-0 top-0 z-40 flex flex-col justify-center gap-8 bg-[var(--color-ink)] px-8 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className="font-display text-4xl"
            style={{ transitionDelay: `${i * 40}ms` }}
            onClick={(e) => {
              e.preventDefault();
              handleClick(l.href);
            }}
          >
            <span className="text-white/30 font-mono text-sm align-top mr-3">0{i + 1}</span>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
