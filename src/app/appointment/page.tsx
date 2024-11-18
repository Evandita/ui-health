import Appointment from "@/components/Appointment";
import Breadcrumb from "@/components/Common/Breadcrumb";
import "tailwindcss/tailwind.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Health Appointment",
  description: "Not feeling well? Book an online health appointment now",
  // other metadata
};


const AppointmentPage = async () => {

  return (
    <>
      <Breadcrumb
          pageName="Appointment"
          description="Not feeling well? Book an online health appointment now"
          
        />
      <div className = "mt-10">
        <Appointment />
      </div>
    </>
  );
};

export default AppointmentPage;
