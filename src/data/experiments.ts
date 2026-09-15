export type Experiment = {
  id: string;
  title: string;
  type: string;
  note: string;
};

export const experiments: Experiment[] = [
  {
    id: "EXPERIMENT 001",
    title: "CURSOR PHYSICS",
    type: "INTERACTION",
    note: "A magnetic cursor that reacts to every element it gets close to.",
  },
  {
    id: "EXPERIMENT 002",
    title: "AI LAYOUT GENERATOR",
    type: "AI / TOOL",
    note: "Feeding content into a model and letting it propose grid compositions.",
  },
  {
    id: "EXPERIMENT 003",
    title: "TYPE ON A PATH",
    type: "MOTION",
    note: "Letters that travel a spline instead of a straight line.",
  },
  {
    id: "EXPERIMENT 004",
    title: "SHADER PLAYGROUND",
    type: "WEBGL",
    note: "Gradient noise fields, tuned by hand until they felt alive.",
  },
  {
    id: "EXPERIMENT 005",
    title: "VOICE TO UI",
    type: "AI / PROTOTYPE",
    note: "Describing a screen out loud and watching components assemble.",
  },
];
