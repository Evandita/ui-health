import { redirect } from "next/navigation"
import pool from "@/utils/postgres";

const NewsLatterBox = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    let student_name = formData.get("studentName");
    let student_email = formData.get("studentEmail");

    try {
      const res = await pool.query(
        'INSERT INTO notification (student_name, student_email) VALUES ($1, $2) RETURNING *',
        [student_name, student_email]
      )

      console.log("Notification Subscribed:", res);
    } catch (error) {
      console.error("Error subscribing notification:", error);
      throw error;
    }
    redirect("/contact");
  };

  return (
    <div className="relative z-10 rounded-sm bg-white/80 p-8 shadow-three dark:bg-gray-dark/80 sm:p-11 lg:p-8 xl:p-11">
      <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">
        Notifications Subscription
      </h3>
      <p className="mb-8 text-base leading-relaxed text-body-color">
        Get up-to-date information about Student Discounts, Health Events, etc.
      </p>
      <form
        action={handleSubmit}
      >
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
          value="Subscribe"
          className="mb-5 font-semibold flex w-full cursor-pointer items-center justify-center rounded-sm bg-yellow_bright px-9 py-4 text-base font-medium text-black shadow-submit duration-300 hover:bg-yellow_bright/50 dark:shadow-submit-dark"
        />
      </form>
    </div>
  );
};

export default NewsLatterBox;
