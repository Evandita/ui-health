import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Hero from "@/components/Hero";
import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klinik Satelit UI",
  description: "Klinik Satelit UI Official Website",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Hero />
      <Video />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
}
