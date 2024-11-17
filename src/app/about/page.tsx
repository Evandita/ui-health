import AboutSectionOne from "@/components/About/AboutSectionOne";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Health About",
  description: "Learn more about Klinik Satelit UI",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="Learn more about Klinik Satelit UI"
      />
      <AboutSectionOne />

    </>
  );
};

export default AboutPage;
