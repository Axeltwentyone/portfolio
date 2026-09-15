import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import type { Project } from "../data/projects";

export function CaseStudy({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backdropRef.current || !modalRef.current) return;
    if (project) {
      document.body.style.overflow = "hidden";
      gsap.set(backdropRef.current, { display: "flex" });
      gsap.fromTo(
        backdropRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        modalRef.current,
        { autoAlpha: 0, y: 24, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" },
      );
      gsap.from(".case-reveal", {
        autoAlpha: 0,
        y: 16,
        stagger: 0.05,
        delay: 0.15,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      document.body.style.overflow = "";
    }
  }, [project]);

  const handleClose = () => {
    if (!backdropRef.current || !modalRef.current) return;
    gsap.to(modalRef.current, { autoAlpha: 0, y: 16, scale: 0.97, duration: 0.25, ease: "power2.in" });
    gsap.to(backdropRef.current, {
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(backdropRef.current, { display: "none" });
        onClose();
      },
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && project) handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) handleClose();
      }}
      className="fixed inset-0 z-[90] hidden items-center justify-center bg-black/80 p-4 backdrop-blur-sm opacity-0 md:p-8"
      style={{ display: "none" }}
    >
      <div
        ref={modalRef}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[var(--color-ink)] p-8 opacity-0 md:p-12"
      >
        <button
          type="button"
          onClick={handleClose}
          data-cursor="CLOSE"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 font-mono text-lg text-white/70 transition-colors hover:border-[var(--color-signal)] hover:text-white md:right-6 md:top-6"
          aria-label="Close case study"
        >
          &times;
        </button>

        {project && (
          <div className="flex flex-col gap-6">
            <div className="case-reveal flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              <span className="text-[var(--color-signal)]">{project.index}</span>
              <span>{project.year}</span>
            </div>

            <h2 className="case-reveal font-display text-[clamp(2rem,6vw,3.25rem)] font-semibold leading-[0.95]">
              {project.name}
            </h2>

            <p className="case-reveal max-w-lg font-body text-base text-white/70 md:text-lg">
              {project.blurb}
            </p>

            <div className="case-reveal grid grid-cols-2 gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Role
                </p>
                <p className="font-body text-sm text-white/80">{project.role}</p>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Focus
                </p>
                <p className="font-body text-sm text-white/80">{project.tags.join(" / ")}</p>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Year
                </p>
                <p className="font-body text-sm text-white/80">{project.year}</p>
              </div>
            </div>

            <div className="case-reveal h-40 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent md:h-56">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <div className="grid h-full place-items-center">
                  <span className="font-display text-xl text-white/20 md:text-2xl">
                    {project.name}
                  </span>
                </div>
              )}
            </div>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="case-reveal group inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-[var(--color-signal)]"
              >
                Visit live site
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
