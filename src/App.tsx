import { Hero } from "./components/Hero";
import { RelationshipCounter } from "./components/RelationshipCounter";
import { Introduction } from "./components/Introduction";
import { Timeline } from "./components/Timeline";
import { MemoryGallery } from "./components/MemoryGallery";
import { LoveLetter } from "./components/LoveLetter";
import { MusicPlayer } from "./components/MusicPlayer";
import { ThingsILove } from "./components/ThingsILove";
import { Surprise } from "./components/Surprise";
import { FinalMessage } from "./components/FinalMessage";
import { Navigation } from "./components/Navigation";
import { playMusic } from "./utils/music";

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="relative">
      {children}
    </div>
  );
}

export default function App() {
  const handleOpen = () => {
    // Start music on user gesture. Fails silently if no audio file.
    playMusic();
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-wine-950">
      <Navigation />
      <MusicPlayer />

      <Section id="inicio">
        <Hero onOpen={handleOpen} />
      </Section>

      <Section id="tempo">
        <RelationshipCounter />
      </Section>

      <Section id="introducao">
        <Introduction />
      </Section>

      <Section id="historia">
        <Timeline />
      </Section>

      <Section id="memorias">
        <MemoryGallery />
      </Section>

      <Section id="carta">
        <LoveLetter />
      </Section>

      <Section id="coisas">
        <ThingsILove />
      </Section>

      <Section id="surpresa">
        <Surprise />
      </Section>

      <Section id="final">
        <FinalMessage />
      </Section>
    </main>
  );
}
