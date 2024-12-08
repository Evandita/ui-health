"use client";

import emailjs from '@emailjs/browser';
import { useState } from "react";

const NewsLatterBox = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const studentName = formData.get("studentName") as string;
    const studentEmail = formData.get("studentEmail") as string;

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName, studentEmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to subscribe");
      }

      const data = await response.json();
      setSuccess("Subscription successful!");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }

    const serviceID = "service_ewtewwz";
    const templateID = "template_r1v0ez5";
    const userID = "9sPMrWqWkn5H2dXmH";

    try {
      const emailParams = {
        studentName: studentName,
        studentEmail: studentEmail
      };

      const res = await emailjs.send(serviceID, templateID, emailParams, userID);

      if (res.status === 200) {
        console.log("Message sent successfully!");
      }
    } catch (error) {
      console.log("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="relative z-10 rounded-sm bg-white/80 p-8 shadow-three dark:bg-gray-dark/80 sm:p-11 lg:p-8 xl:p-11">
      <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">
        Notifications Subscription
      </h3>
      <p className="mb-8 text-base leading-relaxed text-body-color">
        Get up-to-date information about Student Discounts, Health Events, etc.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentName"
          placeholder="Enter your name"
          required
          className="border-stroke mb-4 w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-yellow_bright dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-yellow_bright dark:focus:shadow-none"
        />
        <input
          type="email"
          name="studentEmail"
          placeholder="Enter your email"
          required
          className="border-stroke mb-4 w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-yellow_bright dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-yellow_bright dark:focus:shadow-none"
        />
        <input
          type="submit"
          value={loading ? "Submitting..." : "Subscribe"}
          className="mb-5 font-semibold flex w-full cursor-pointer items-center justify-center rounded-sm bg-yellow_bright px-9 py-4 text-base font-medium text-black shadow-submit duration-300 hover:bg-yellow_bright/50 dark:shadow-submit-dark"
          disabled={loading}
        />
      </form>
      {error && (
        <p className="mt-4 text-red-600 text-sm">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-4 text-green-600 text-sm">
          {success}
        </p>
      )}
    </div>
  );
};

export default NewsLatterBox;
