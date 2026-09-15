import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { projects, type Project } from "../data/projects";
import { CaseStudy } from "../components/CaseStudy";

export function Work() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
        gsap.from(row, {
          autoAlpha: 0,
          y: 80,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-4 md:mb-24">
          <span className="font-mono text-xs text-[var(--color-signal)]">04</span>
          <span className="h-px flex-1 bg-white/15" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            Work
          </span>
        </div>

        <div className="flex flex-col">
          {projects.map((p) => (
            <ProjectRow key={p.index} project={p} onOpen={() => setActive(p)} />
          ))}
        </div>
      </div>

      <CaseStudy project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ProjectRow({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(cardRef.current, { x: x * 0.02, y: y * 0.08, duration: 0.4, ease: "power2.out" });
    gsap.to(".title-" + project.index, { x: x * 0.015, duration: 0.4, ease: "power2.out" });
  };
  const handleLeave = () => {
    gsap.to(cardRef.current, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
    gsap.to(".title-" + project.index, { x: 0, duration: 0.6, ease: "power3.out" });
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="VIEW"
      className="project-row group relative flex w-full flex-col gap-6 border-t border-white/10 py-10 text-left last:border-b md:flex-row md:items-center md:gap-10 md:py-14"
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span className="font-mono text-sm text-white/30 md:w-16">{project.index}</span>

      <div
        className={`title-${project.index} order-1 flex-1 transition-transform duration-300 md:order-none`}
      >
        <h3 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-none transition-colors group-hover:text-[var(--color-signal)]">
          {project.name}
        </h3>
        <p className="mt-3 max-w-md font-body text-sm text-white/50 md:text-base">
          {project.blurb}
        </p>
      </div>

      <div className="order-2 flex shrink-0 flex-col items-start gap-2 md:order-none md:w-56 md:items-end md:text-right">
        <div className="flex flex-wrap gap-2 md:justify-end">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
          {project.year}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1 origin-bottom scale-y-0 bg-[var(--color-signal)] transition-transform duration-300 group-hover:scale-y-100 md:block" />
    </button>
  );
}
