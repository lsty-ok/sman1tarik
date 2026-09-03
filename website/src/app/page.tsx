import Hero from "@/components/home/Hero";
import PPDBQuickInfo from "@/components/home/PPDBQuickInfo";
import Keunggulan from "@/components/home/Keunggulan";
import Sambutan from "@/components/home/Sambutan";
import AngkaKita from "@/components/home/AngkaKita";
import Fasilitas from "@/components/home/Fasilitas";
import ProgramUnggulan from "@/components/home/ProgramUnggulan";
import Ekskul from "@/components/home/Ekskul";
import Prestasi from "@/components/home/Prestasi";
import Galeri from "@/components/home/Galeri";

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

      {/* Zona 3 — School Experience */}
      <Fasilitas />
      <ProgramUnggulan />
      <Ekskul />
      <Prestasi />
      <Galeri />
    </>
  );
}
