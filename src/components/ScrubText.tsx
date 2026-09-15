import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const spans = gsap.utils.toArray<HTMLElement>(".scrub-word", ref.current!);
      gsap.set(spans, { opacity: 0.12 });
      gsap.to(spans, {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          end: "bottom 45%",
          scrub: 0.5,
        },
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.trigger === ref.current && t.kill());
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="scrub-word">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
