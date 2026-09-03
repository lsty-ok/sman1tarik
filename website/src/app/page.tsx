import Hero from "@/components/home/Hero";
import PPDBQuickInfo from "@/components/home/PPDBQuickInfo";
import Keunggulan from "@/components/home/Keunggulan";
import Sambutan from "@/components/home/Sambutan";
import AngkaKita from "@/components/home/AngkaKita";

export default function Home() {
  return (
    <>
      {/* Zona 1 — First Impression */}
      <Hero />
      <PPDBQuickInfo />

      {/* Zona 2 — Trust */}
      <Keunggulan />
      <Sambutan />
      <AngkaKita />
    </>
  );
}
