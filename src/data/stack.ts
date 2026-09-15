export type StackGroup = {
  label: string;
  items: string[];
};

export const stack: StackGroup[] = [
  { label: "FRONTEND", items: ["React", "TypeScript", "Tailwind", "Vite"] },
  { label: "BACKEND", items: ["Laravel", "PHP", "MySQL"] },
  { label: "MOBILE", items: ["Flutter"] },
  { label: "CREATIVE", items: ["Figma", "After Effects", "Premiere Pro"] },
];
