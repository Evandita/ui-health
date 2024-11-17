import AboutSectionOne from "@/components/About/AboutSectionOne";
import Appointment from "@/components/Appointment";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Video from "@/components/Video";
import pool from "@/utils/postgres";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klinik Satelit UI",
  description: "Klinik Satelit UI Official Website",
  // other metadata
};

const fetchDataFromDB = async() => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database!");

    const result = await client.query("SELECT * FROM admin");
    const data = result.rows;
    console.log("Fetched data: ", data);

    client.release();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

export default function Home() {
  fetchDataFromDB().then(data => {
    console.log("Received data: ", data);
  }).catch( error => {
    console.error("Error fetching data: ", error);
  })
  return (
    <>
      <Hero />
      <Video />
      <AboutSectionOne />
      <Appointment />
      <Contact />
      <Blog />
    </>
  );
}
