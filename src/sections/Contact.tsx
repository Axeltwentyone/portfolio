import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const SOCIALS = [
  { label: "EMAIL", href: "mailto:hello@axelteky.com" },
  { label: "LINKEDIN", href: "#" },
  { label: "GITHUB", href: "#" },
  { label: "INSTAGRAM", href: "#" },
];

export function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        autoAlpha: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btnRef.current, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
  };
  const handleLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <footer id="contact" ref={root} className="relative flex min-h-[100svh] flex-col justify-between px-6 py-20 md:px-10">
      <div className="contact-reveal flex items-center gap-4">
        <span className="font-mono text-xs text-[var(--color-signal)]">08</span>
        <span className="h-px flex-1 bg-white/15" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          Contact
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="contact-reveal mb-6 font-mono text-xs uppercase tracking-[0.3em] text-white/50">
          Got an idea?
        </p>
        <h2 className="contact-reveal font-display text-[clamp(2.5rem,11vw,8rem)] font-semibold leading-[0.9]">
          LET'S BUILD
          <br />
          SOMETHING.
        </h2>

        <a
          ref={btnRef}
          href="mailto:hello@axelteky.com"
          data-cursor="SAY HI"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="contact-reveal group relative mt-14 inline-flex h-40 w-40 items-center justify-center rounded-full bg-[var(--color-signal)] font-display text-lg font-semibold text-black transition-transform duration-300 hover:scale-105 md:h-52 md:w-52 md:text-xl"
        >
          TOGETHER.
        </a>
      </div>

      <div className="contact-reveal flex flex-col items-center gap-8 border-t border-white/10 pt-8 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
          © {new Date().getFullYear()} Axel Teky — All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              data-cursor="OPEN"
              className="font-mono text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-[var(--color-signal)]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
