import Breadcrumb from "@/components/Common/Breadcrumb";
import Appointment from "@/components/Appointment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Health Appointment",
  description: "Not feeling well? Book an online health appointment now",
  // other metadata
};

const AppointmentPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Appointment"
        description="Not feeling well? Book an online health appointment now"
      />

      <div className="mt-12">
        <Appointment />
      </div>
    </>
  );
};

export default AppointmentPage;