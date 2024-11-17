import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Health Support",
  description: "Need additional help? Contact us now!",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="UI Health Support"
        description="Any confusion and need additional help? Feel free to reach us now!"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
