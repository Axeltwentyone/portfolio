import shoptongbaLogo from "../assets/shoptongba-logo.png";
import maxitFigma from "../assets/maxit-figma.png";

export type Project = {
  index: string;
  name: string;
  tags: string[];
  role: string;
  blurb: string;
  year: string;
  image?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "SHOPTONGBA",
    tags: ["PRODUCT", "WEB", "MOBILE"],
    role: "CO-FOUNDER / CTO / DESIGN / DEVELOPMENT",
    blurb: "A vehicle rental platform built from zero — product, brand and code, all in one head.",
    year: "2024",
    image: shoptongbaLogo,
    url: "https://shoptongba.ci/",
  },
  {
    index: "02",
    name: "MAX IT",
    tags: ["INTERFACE", "DIGITAL EXPERIENCE"],
    role: "DESIGN / DEVELOPMENT",
    blurb: "A digital experience designed to feel faster than it has any right to.",
    year: "2023",
    image: maxitFigma,
  },
  {
    index: "03",
    name: "MABOX INTERNET",
    tags: ["LANDING", "BRAND"],
    role: "DESIGN / DEVELOPMENT",
    blurb: "A landing page built to make an internet provider feel like a tech company.",
    year: "2023",
  },
  {
    index: "04",
    name: "ECOWORK",
    tags: ["PLATFORM", "WEB"],
    role: "PRODUCT / DEVELOPMENT",
    blurb: "A coworking reservation platform — book a desk the way you'd book a seat.",
    year: "2023",
  },
  {
    index: "05",
    name: "MÉTÉO-RISQUES",
    tags: ["PLATFORM", "DATA"],
    role: "DEVELOPMENT",
    blurb: "A weather alert platform that turns raw risk data into something people act on.",
    year: "2022",
  },
  {
    index: "06",
    name: "BIOFLEX",
    tags: ["HR", "PLATFORM"],
    role: "DEVELOPMENT",
    blurb: "An HR management platform for teams who'd rather not think about HR software.",
    year: "2022",
  },
];
