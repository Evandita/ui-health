"use client";

import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

const Appointment = () => {
  
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [description, setDescription] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  
  // Generate time options for every hour from 8:00 a.m. to 4:00 p.m.
  const timeOptions = Array.from({ length: 9 }, (_, i) => {
    const hour = 8 + i;
    const timeLabel = `${hour}:00 ${hour < 12 ? "a.m." : "p.m."}`;
    return (
      <option key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
        {timeLabel}
      </option>
    );
  });

  // Generate available date options for the next month, excluding weekends
  useEffect(() => {
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
      setAvailableDates(dates);
    };
    generateWeekdayDates();
  }, []);

   // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      student_id: studentId,
      service_id: serviceId,
      description: description,
      student_name: studentName,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      console.log("test")
      console.log(appointmentData);
      console.log(response);

      if (response.ok) {
        setSuccessMessage("Appointment booked successfully!");
        // Clear form fields
        setStudentName("");
        setStudentId("");
        setAppointmentDate("");
        setAppointmentTime("");
        setServiceId("");
        setDescription("");
      } else {
        console.error("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-cover bg-center bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[100px] 2xl:pt-[100px]"
      style={{
        backgroundImage: 'url("/images/klinik-makara-4.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-white opacity-80 dark:bg-dark dark:opacity-80 z-10"></div>
      <div className="container relative z-20">
        <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:space-x-20">
          {/* Form for Booking an Appointment */}
          <div
            className="max-w-[600px] w-full mb-12 lg:mb-0 transition-transform transform hover:scale-105 duration-300"
            data-wow-delay=".15s"
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-yellow_bright/50 p-8 rounded-md shadow-lg dark:bg-blue/50">
              <h3 className="text-2xl text-center font-bold text-black dark:text-white">
                Online Appointment Form
              </h3>

              {/* Row 1: Student Name and Student ID */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Student Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    title="Enter your full name here"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Student ID</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    title="Enter your student ID here"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
                    placeholder="Enter your student ID"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Appointment Date and Time */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Appointment Date</label>
                  <select
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    title="Select your preferred appointment date"
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
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Appointment Time</label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    title="Select your preferred appointment time"
                    className="w-full cursor-pointer px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
                    required
                  >
                    <option value="">Select a time</option>
                    {timeOptions}
                  </select>
                </div>
              </div>

              {/* Health Services (Full width) */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Health Services</label>
                <select
                  title="Choose the type of health service you need"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="1">General Consultation</option>
                  <option value="2">Dental Checkup</option>
                  <option value="3">Psychology Counseling</option>
                  <option value="4">Physical Examination</option>
                </select>
              </div>

              {/* Description (Optional) */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Description (Optional)</label>
                <textarea
                  title="Provide any additional information related to your appointment"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright resize-none"
                  placeholder="Provide additional information if needed"
                  rows={4}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  title="Submit your appointment booking"
                  className="w-full py-4 text-white dark:text-black font-semibold bg-black dark:bg-yellow_bright rounded-md hover:bg-black/50 dark:hover:bg-yellow_bright/50 duration-300 ease-in-out"
                >
                  Book Appointment
                </button>
              </div>
              {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
            </form>
          </div>

          {/* Right Column Content - Text */}
          <div className="max-w-[470px]">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-10">Not Feeling Well?</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Book an online health appointment with Klinik Satelit UI to get a comprehensive health checkup with
              professionals by filling in the form now. Our experienced medical staff is ready to assist you with
              personalized care, addressing all your health concerns. Whether it's a routine checkup or a specific
              issue, we offer a wide range of services tailored to meet your needs. Don't wait—ensure your well-being
              by scheduling your appointment today, and take the first step towards a healthier tomorrow with ease and
              convenience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
