import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import Link from "next/link";
import pool from "@/utils/postgres";
import "tailwindcss/tailwind.css";

// Server-side utility for generating available dates
const generateWeekdayDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayOfWeek = date.getUTCDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Exclude Sundays (0) and Saturdays (6)
      dates.push(date.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    }
  }
  return dates;
};

export const timeOptions = Array.from({ length: 9 }, (_, i) => {
  const hour = 8 + i;
  const timeLabel = `${hour}:00 ${hour < 12 ? "a.m." : "p.m."}`;
  return { value: `${hour.toString().padStart(2, "0")}:00`, label: timeLabel };
});

const Appointment = async () => {
  const availableDates = generateWeekdayDates();

  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");

  let userData = null;
  if (userCookie) {
    try {
      userData = JSON.parse(userCookie.value); // Parse the JSON string from the cookie value
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }
  else {
    userData = {
      id: 0
    }
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";
  
    let student_id = formData.get("studentId");
    let service_id = formData.get("serviceId");
    let description = formData.get("description");
    let student_name = formData.get("studentName");
    let appointment_date = formData.get("appointmentDate");
    let appointment_time = formData.get("appointmentTime");
  
    try {
      const res = await pool.query(
        'INSERT INTO appointment (student_id, service_id, description, student_name, appointment_date, appointment_time, account_id, status, bill) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [student_id, service_id, description, student_name, appointment_date, appointment_time, userData.id, "Pending Approval", "-"]
      );
  
      console.log("Appointment booked:", res);

      // Redirect to the success page upon successful submission
      redirect("/appointment-success");
    } catch (error) {
      console.error("Error booking appointment:", error);
      throw error;
    }
  };  

  return (
    <>
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-cover bg-center bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[100px] 2xl:pt-[100px]"
      style={{
        backgroundImage: 'url("/images/klinik-makara-4.jpg")',
      }}
    >
      {!userCookie && (
        <div className="absolute inset-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md flex justify-center items-center">
          <div className="text-center p-8">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-10">
              Please Log In to book an appointment
            </h3>
            <div className="mt-6 flex space-x-4 justify-center">
              <Link
                href="/signin"
                className="ease-in-up shadow-btn hover:shadow-btn-hover  rounded-sm text-white dark:text-dark bg-dark dark:bg-white px-8 py-3 text-base font-medium transition duration-300 hover:bg-dark/50 dark:hover:bg-white/50 md:block md:px-9 lg:px-6 xl:px-9"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="ease-in-up shadow-btn hover:shadow-btn-hover  rounded-sm bg-yellow_bright px-8 py-3 text-base font-medium text-dark transition duration-300 hover:bg-yellow_bright/50 md:block md:px-9 lg:px-6 xl:px-9"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-white opacity-80 dark:bg-dark dark:opacity-80 z-10"></div>
      <div className="container relative z-20">
        <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:space-x-20">
          <div className="max-w-[600px] w-full mb-12 lg:mb-0 transition-transform transform hover:scale-105 duration-300">
            <form
              action={handleSubmit}
              className="space-y-6 bg-yellow_bright/50 p-8 rounded-md shadow-lg dark:bg-blue/50"
            >
              <h3 className="text-2xl text-center font-bold text-black dark:text-white">
                Online Appointment Form
              </h3>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                    Student Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
                    placeholder="Enter your student ID"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                    Appointment Date
                  </label>
                  <select
                    name="appointmentDate"
                    className="w-full cursor-pointer px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
                    required
                  >
                    <option value="">Select a date</option>
                    {availableDates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                    Appointment Time
                  </label>
                  <select
                    name="appointmentTime"
                    className="w-full cursor-pointer px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
                    required
                  >
                    <option value="">Select a time</option>
                    {timeOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Health Services
                </label>
                <select
                  name="serviceId"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="1">General and family medicine clinic</option>
                  <option value="2">General dental clinic</option>
                  <option value="3">Pulmonary clinic</option>
                  <option value="4">Maternal and child health clinic</option>
                  <option value="5">Counseling</option>
                  <option value="6">Pharmacy</option>
                  <option value="7">Emergency Treatment (minor)</option>
                  <option value="8">Laboratory</option>
                  <option value="9">Ambulance</option>
                  <option value="10">Body Mass Index Analysis</option>
                  <option value="11">Electrocardiography</option>
                  <option value="12">Pregnancy ultrasound</option>
                  <option value="13">Education, training, and research services</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright resize-none"
                  placeholder="Provide additional information if needed"
                  rows={4}
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-4 text-white dark:text-black font-semibold bg-black dark:bg-yellow_bright rounded-md hover:bg-black/50 dark:hover:bg-yellow_bright/50 duration-300 ease-in-out"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
          {/* Right Column Content - Text */}
          <div className="max-w-[470px]">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-10">Not Feeling Well?</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Book an online health appointment with Klinik Satelit UI to get a comprehensive health checkup with
              professionals by filling in the form now. Our experienced medical staff is ready to assist you with
              personalized care, addressing all your health concerns. Whether it&apos;s a routine checkup or a specific
              issue, we offer a wide range of services tailored to meet your needs. Don&apos;t wait—ensure your well-being
              by scheduling your appointment today, and take the first step towards a healthier tomorrow with ease and
              convenience.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Appointment;
