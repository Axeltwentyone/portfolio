import { useSmoothScroll } from "./lib/useSmoothScroll";
import { CustomCursor } from "./components/CustomCursor";
import { Nav } from "./components/Nav";
import { Hero } from "./sections/Hero";
import { Think } from "./sections/Think";
import { Create } from "./sections/Create";
import { Work } from "./sections/Work";
import { Experiments } from "./sections/Experiments";
import { TechStack } from "./sections/TechStack";
import { Personality } from "./sections/Personality";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";

function App() {
  useSmoothScroll();

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Think />
        <Create />
        <Work />
        <Experiments />
        <TechStack />
        <Personality />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;
