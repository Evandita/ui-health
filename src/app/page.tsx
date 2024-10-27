import AboutSectionOne from "@/components/About/AboutSectionOne";
import Appointment from "@/components/Appointment";
import Contact from "@/components/Contact";
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
      <Appointment />
      <Contact />
    </>
  );
}
